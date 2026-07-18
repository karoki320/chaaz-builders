import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

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
  const activeCategory = (categories as Category[] | null ?? []).find((c) => c.slug === category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-xs text-neutral-500 mb-2">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700">Shop</span>
        {activeCategory && (
          <>
            <span className="mx-1.5">/</span>
            <span className="text-neutral-700">{activeCategory.name}</span>
          </>
        )}
      </p>
      <h1 className="text-2xl font-bold text-brand-dark mb-6">{activeCategory ? activeCategory.name : "Shop All Products"}</h1>

      <div className="flex gap-2 flex-wrap mb-8 text-sm">
        <Link
          href="/shop"
          className={`px-4 py-1.5 rounded-full border transition-colors ${!category ? "bg-brand-gradient text-white border-transparent" : "bg-white text-neutral-700"}`}
        >
          All
        </Link>
        {(categories as Category[] | null ?? []).map((c) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.slug}`}
            className={`px-4 py-1.5 rounded-full border transition-colors ${category === c.slug ? "bg-brand-gradient text-white border-transparent" : "bg-white text-neutral-700"}`}
          >
            {c.icon} {c.name}
          </Link>
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
