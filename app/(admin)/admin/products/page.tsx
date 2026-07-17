import { getServiceSupabase } from "@/lib/supabase/server";
import { formatKES } from "@/lib/utils";
import { ProductForm } from "./ProductForm";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = getServiceSupabase();
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").order("name"),
    supabase.from("categories").select("*").order("name"),
  ]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Products</h1>

      <div className="border rounded-lg p-4 bg-white mb-8">
        <h2 className="font-medium mb-3">Add product</h2>
        <ProductForm categories={categories ?? []} />
      </div>

      <table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
        <thead className="bg-neutral-50 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
          </tr>
        </thead>
        <tbody>
          {(products ?? []).map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{formatKES(p.price)}</td>
              <td className="p-3">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
