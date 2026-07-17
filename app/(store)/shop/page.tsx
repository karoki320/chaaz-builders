import { getServiceSupabase } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import type { Category, Product } from "@/lib/types";

export const revalidate = 60;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const supabase = getServiceSupabase();

  let query = supabase.from("products").select("*, categories!inner(slug)").order("name");
  if (category) query = query.eq("categories.slug", category);
  if (q) query = query.ilike("name", `%${q}%`);

  const { data } = await query;
  const products = (data ?? []) as unknown as Product[];

  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Shop</h1>
      <div className="flex gap-2 flex-wrap mb-6 text-sm">
        <a href="/shop" className={`px-3 py-1 rounded-full border ${!category ? "bg-brand text-white" : ""}`}>
          All
        </a>
        {(categories as Category[] | null ?? []).map((c) => (
          <a
            key={c.id}
            href={`/shop?category=${c.slug}`}
            className={`px-3 py-1 rounded-full border ${category === c.slug ? "bg-brand text-white" : ""}`}
          >
            {c.icon} {c.name}
          </a>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-neutral-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
