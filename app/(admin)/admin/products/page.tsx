import { getServiceSupabase } from "@/lib/supabase/server";
import { ProductForm } from "./ProductForm";
import { ProductRow } from "./ProductRow";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = getServiceSupabase();
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").order("name"),
    supabase.from("categories").select("*").order("name"),
  ]);

  const categoryList = (categories ?? []) as Category[];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 hidden md:block">Products</h1>

      <div className="border rounded-lg p-4 bg-white mb-8">
        <h2 className="font-medium mb-3">Add product</h2>
        <ProductForm categories={categoryList} />
      </div>

      <div className="space-y-3">
        {(products as Product[] | null ?? []).map((p) => (
          <ProductRow key={p.id} product={p} categories={categoryList} />
        ))}
        {(!products || products.length === 0) && <p className="text-neutral-500">No products yet.</p>}
      </div>
    </div>
  );
}
