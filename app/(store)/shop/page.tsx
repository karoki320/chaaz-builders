import { getServiceSupabase } from "@/lib/supabase/server";
import { ProductBrowser } from "@/components/ProductBrowser";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop All Products",
  description: "Browse bathroom fittings, plumbing, paint, tiles, steel and tools. Order on WhatsApp - delivered across Nairobi and its environs.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const supabase = getServiceSupabase();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*, categories(slug, name)").order("name"),
    supabase.from("categories").select("*").order("name"),
  ]);

  const cats = (categories ?? []) as Category[];
  const initialCategory = category && cats.some((c) => c.slug === category) ? category : "all";

  return (
    <ProductBrowser
      products={(products ?? []) as unknown as (Product & { categories: { slug: string; name: string } | null })[]}
      categories={cats}
      initialQuery={q ?? ""}
      initialCategory={initialCategory}
      heading="Shop All Products"
      asPageTitle
    />
  );
}
