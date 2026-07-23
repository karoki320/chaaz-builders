import { getServiceSupabase } from "@/lib/supabase/server";
import { OrderRow } from "./OrderRow";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const supabase = getServiceSupabase();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, customers(name, phone), order_items(product_name, quantity, unit_price)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 hidden md:block">Orders</h1>
      <div className="space-y-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(orders ?? []).map((o: any) => (
          <OrderRow key={o.id} order={o} />
        ))}
        {(!orders || orders.length === 0) && <p className="text-neutral-500">No orders yet.</p>}
      </div>
    </div>
  );
}
