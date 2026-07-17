import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getHomeData() {
  const supabase = getServiceSupabase();
  const [{ data: categories }, { data: featured }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("products").select("*").eq("featured", true).limit(8),
  ]);
  return {
    categories: (categories ?? []) as Category[],
    featured: (featured ?? []) as Product[],
  };
}

export default async function HomePage() {
  const { categories, featured } = await getHomeData();

  return (
    <div>
      <section className="bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Everything for your build.</h1>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            Cement, steel, plumbing, paint, tiles and tools - in stock, delivered fast.
          </p>
          <Link href="/shop" className="inline-block bg-white text-brand-dark px-6 py-3 rounded-md font-medium">
            Shop now
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-lg font-semibold mb-4">Shop by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.slug}`}
              className="border rounded-lg p-4 text-center hover:shadow-md transition bg-white"
            >
              <div className="text-3xl mb-2">{c.icon ?? "📦"}</div>
              <div className="text-sm font-medium">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-lg font-semibold mb-4">Featured products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
