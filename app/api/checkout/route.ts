import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { triggerMpesaStkPush } from "@/lib/mpesa";
import { generateOrderNumber } from "@/lib/utils";

type CartItemInput = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, deliveryFee } = body as {
      customer: { name: string; phone: string; email?: string; address: string };
      items: CartItemInput[];
      deliveryFee: number;
    };

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
    }
    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // Upsert customer by phone
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", customer.phone)
      .maybeSingle();

    let customerId = existingCustomer?.id as number | undefined;
    if (!customerId) {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({ name: customer.name, phone: customer.phone, email: customer.email, address: customer.address })
        .select("id")
        .single();
      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subtotal + deliveryFee;
    const orderNumber = generateOrderNumber();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        delivery_address: customer.address,
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id")
      .single();
    if (orderError) throw orderError;

    const orderItemsPayload = items.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      product_name: i.name,
      quantity: i.quantity,
      unit_price: i.price,
    }));
    const { error: itemsError } = await supabase.from("order_items").insert(orderItemsPayload);
    if (itemsError) throw itemsError;

    // Fire the M-Pesa STK push. If this fails, the order still exists as
    // "unpaid" and the customer can be nudged to retry from the admin panel.
    try {
      await triggerMpesaStkPush({
        phoneNumber: customer.phone,
        amount: total,
        orderNumber,
      });
    } catch (mpesaError) {
      console.error("[M-Pesa] STK push failed:", mpesaError);
    }

    return NextResponse.json({ orderId: order.id, orderNumber });
  } catch (error) {
    console.error("[Checkout] Failed:", error);
    return NextResponse.json({ error: "Checkout failed, please try again" }, { status: 500 });
  }
}
