import { getServiceSupabase } from "@/lib/supabase/server";
import { formatKES } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = getServiceSupabase();
  const [{ count: productCount }, { count: orderCount }, { data: recentOrders }, { data: paidOrders }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("orders").select("total").eq("payment_status", "paid"),
    ]);

  const revenue = (paidOrders ?? []).reduce((sum, o) => sum + parseFloat(o.total), 0);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-4 bg-white">
          <p className="text-sm text-neutral-500">Products</p>
          <p className="text-2xl font-bold">{productCount ?? 0}</p>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <p className="text-sm text-neutral-500">Orders</p>
          <p className="text-2xl font-bold">{orderCount ?? 0}</p>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <p className="text-sm text-neutral-500">Revenue (paid)</p>
          <p className="text-2xl font-bold">{formatKES(revenue)}</p>
        </div>
      </div>

      <h2 className="font-semibold mb-3">Recent orders</h2>
      <table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
        <thead className="bg-neutral-50 text-left">
          <tr>
            <th className="p-3">Order #</th>
            <th className="p-3">Total</th>
            <th className="p-3">Payment</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {(recentOrders ?? []).map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3">{o.order_number}</td>
              <td className="p-3">{formatKES(o.total)}</td>
              <td className="p-3">{o.payment_status}</td>
              <td className="p-3">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
