import { getServiceSupabase } from "@/lib/supabase/server";
import { Hero } from "@/components/Hero";
import { ProductBrowser } from "@/components/ProductBrowser";
import { TrustSection } from "@/components/TrustSection";
import { JsonLd } from "@/components/JsonLd";
import { BUSINESS } from "@/lib/business";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { alternates: { canonical: "/" } };

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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HardwareStore",
          name: BUSINESS.name,
          url: BUSINESS.siteUrl,
          logo: `${BUSINESS.siteUrl}/icon.png`,
          image: `${BUSINESS.siteUrl}/og-image.jpg`,
          telephone: BUSINESS.phoneTel,
          description: "Building materials and plumbing supplies - order on WhatsApp, delivered across Nairobi and its environs.",
          areaServed: { "@type": "City", name: "Nairobi" },
          priceRange: "KES",
          ...(BUSINESS.address
            ? { address: { "@type": "PostalAddress", streetAddress: BUSINESS.address, addressLocality: "Nairobi", addressCountry: "KE" } }
            : { address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" } }),
          ...(BUSINESS.hours ? { openingHours: BUSINESS.hours } : {}),
        }}
      />
      <h1 className="sr-only">Chaaz Builders - building materials and plumbing supplies in Nairobi</h1>
      <Hero />
      <ProductBrowser products={products} categories={categories} />
      <TrustSection />
    </div>
  );
}
