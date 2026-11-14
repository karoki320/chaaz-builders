import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { generateOrderNumber } from "@/lib/utils";
import { orderToken } from "@/lib/order-token";
import { DELIVERY_FEE, MAX_QTY_PER_ITEM } from "@/lib/shop-config";

type CartItemInput = { productId: number; quantity: number };

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const c = body?.customer ?? {};
    const customer = {
      name: clean(c.name, 100),
      phone: clean(c.phone, 20),
      email: clean(c.email, 120) || null,
      address: clean(c.address, 300),
    };
    if (!customer.name || !customer.phone || !customer.address) {
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
    }
    if (!/^[+\d][\d\s-]{6,19}$/.test(customer.phone)) {
      return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
    }

    const rawItems: CartItemInput[] = Array.isArray(body?.items) ? body.items.slice(0, 100) : [];
    const wanted = new Map<number, number>();
    for (const i of rawItems) {
      const id = Number(i?.productId);
      const qty = Math.floor(Number(i?.quantity));
      if (!Number.isInteger(id) || id <= 0 || !Number.isFinite(qty) || qty < 1) continue;
      wanted.set(id, Math.min(MAX_QTY_PER_ITEM, (wanted.get(id) ?? 0) + qty));
    }
    if (wanted.size === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // Real prices come from the database, never from the browser.
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, stock")
      .in("id", [...wanted.keys()]);
    if (productsError) throw productsError;

    const lines = (products ?? [])
      .filter((p) => Number(p.price) > 0)
      .map((p) => ({
        productId: p.id as number,
        name: p.name as string,
        price: Number(p.price),
        quantity: wanted.get(p.id as number)!,
      }));
    if (lines.length !== wanted.size) {
      return NextResponse.json(
        { error: "Some items in your cart are no longer available. Please review your cart." },
        { status: 409 }
      );
    }

    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", customer.phone)
      .maybeSingle();

    let customerId = existingCustomer?.id as number | undefined;
    if (!customerId) {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert(customer)
        .select("id")
        .single();
      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    const total = subtotal + DELIVERY_FEE;
    const orderNumber = generateOrderNumber();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        subtotal,
        delivery_fee: DELIVERY_FEE,
        total,
        delivery_address: customer.address,
        status: "pending",
        payment_status: "unpaid",
        payment_method: "whatsapp",
      })
      .select("id")
      .single();
    if (orderError) throw orderError;

    const { error: itemsError } = await supabase.from("order_items").insert(
      lines.map((l) => ({
        order_id: order.id,
        product_id: l.productId,
        product_name: l.name,
        quantity: l.quantity,
        unit_price: l.price,
      }))
    );
    if (itemsError) throw itemsError;

    return NextResponse.json({
      orderId: order.id,
      orderNumber,
      token: orderToken(order.id),
      items: lines.map(({ name, price, quantity }) => ({ name, price, quantity })),
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
    });
  } catch (error) {
    console.error("[Checkout] Failed:", error);
    return NextResponse.json({ error: "Checkout failed, please try again" }, { status: 500 });
  }
}
