import { getServiceSupabase } from "@/lib/supabase/server";
import { formatKES } from "@/lib/utils";
import { orderWhatsappLink } from "@/lib/whatsapp";
import { notFound } from "next/navigation";

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getServiceSupabase();
  const { data: order } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();

  if (!order) notFound();

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-xl font-semibold mb-2">Order received!</h1>
      <p className="text-neutral-600 mb-1">Order number: <strong>{order.order_number}</strong></p>
      <p className="text-neutral-600 mb-6">
        Total: <strong>{formatKES(order.total)}</strong> - check your phone for the M-Pesa prompt.
      </p>
      <a href={orderWhatsappLink(order.order_number)} className="text-green-700 underline text-sm">
        Message us on WhatsApp about this order
      </a>
    </div>
  );
}
