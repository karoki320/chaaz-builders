import { getServiceSupabase } from "@/lib/supabase/server";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getHomeData() {
  const supabase = getServiceSupabase();
  const [{ data: categories }, { data: featured }, { count: productCount }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("products").select("*").eq("featured", true).limit(8),
    supabase.from("products").select("*", { count: "exact", head: true }),
  ]);
  return {
    categories: (categories ?? []) as Category[],
    featured: (featured ?? []) as Product[],
    productCount: productCount ?? 0,
    categoryCount: (categories ?? []).length,
  };
}

export default async function HomePage() {
  const { categories, featured, productCount, categoryCount } = await getHomeData();

  return (
    <div>
      <Hero />

      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-dark">Shop by Category</h2>
          <p className="text-neutral-500 mt-2">Everything for your build, organized for you.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark">Featured Products</h2>
            <p className="text-neutral-500 mt-2">Popular picks, in stock and ready to ship.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <WhyChooseUs productCount={productCount} categoryCount={categoryCount} />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
}
