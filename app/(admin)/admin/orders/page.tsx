import { getServiceSupabase } from "@/lib/supabase/server";
import { formatKES } from "@/lib/utils";
import { OrderStatusForm } from "./OrderStatusForm";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const supabase = getServiceSupabase();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, customers(name, phone)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Orders</h1>
      <div className="space-y-3">
        {(orders ?? []).map((o) => (
          <div key={o.id} className="border rounded-lg p-4 bg-white flex items-center justify-between">
            <div>
              <p className="font-medium">{o.order_number}</p>
              <p className="text-sm text-neutral-500">
                {o.customers?.name} - {o.customers?.phone}
              </p>
              <p className="text-sm text-neutral-500">
                {formatKES(o.total)} - payment: {o.payment_status}
              </p>
            </div>
            <OrderStatusForm orderId={o.id} currentStatus={o.status} />
          </div>
        ))}
        {(!orders || orders.length === 0) && <p className="text-neutral-500">No orders yet.</p>}
      </div>
    </div>
  );
}
