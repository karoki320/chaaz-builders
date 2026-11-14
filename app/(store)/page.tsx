import { getServiceSupabase } from "@/lib/supabase/server";
import { Hero } from "@/components/Hero";
import { ProductBrowser } from "@/components/ProductBrowser";
import { TrustSection } from "@/components/TrustSection";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getHomeData() {
  const supabase = getServiceSupabase();
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("products").select("*, categories(slug, name)").order("name"),
  ]);
  return {
    categories: (categories ?? []) as Category[],
    products: (products ?? []) as unknown as (Product & { categories: { slug: string; name: string } | null })[],
  };
}

export default async function HomePage() {
  const { categories, products } = await getHomeData();

  return (
    <div>
      <Hero />
      <ProductBrowser products={products} categories={categories} />
      <TrustSection />
    </div>
  );
}
