import { getServiceSupabase } from "@/lib/supabase/server";
import { formatKES } from "@/lib/utils";
import { orderDetailsWhatsappLink } from "@/lib/whatsapp";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getServiceSupabase();
  const { data: order } = await supabase
    .from("orders")
    .select("*, customers(name, phone), order_items(product_name, quantity, unit_price)")
    .eq("id", id)
    .maybeSingle();

  if (!order) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = order as any;

  const waLink = orderDetailsWhatsappLink({
    orderNumber: o.order_number,
    name: o.customers?.name ?? "",
    phone: o.customers?.phone ?? "",
    address: o.delivery_address ?? "",
    items: (o.order_items ?? []).map((i: { product_name: string; unit_price: string | number; quantity: number }) => ({
      name: i.product_name,
      price: Number(i.unit_price),
      quantity: i.quantity,
    })),
    subtotal: Number(o.subtotal),
    deliveryFee: Number(o.delivery_fee),
    total: Number(o.total),
  });

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-xl font-semibold mb-2">Order received!</h1>
      <p className="text-neutral-600 mb-1">
        Order number: <strong>{o.order_number}</strong>
      </p>
      <p className="text-neutral-600 mb-6">
        Total: <strong>{formatKES(o.total)}</strong> - we&apos;ll confirm payment details with you on WhatsApp.
      </p>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-medium"
      >
        Continue on WhatsApp
      </a>
    </div>
  );
}
