import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceSupabase } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import { displayName, formatKES, hasPrice } from "@/lib/utils";
import { ProductPageClient } from "./ProductPageClient";
import { JsonLd } from "@/components/JsonLd";
import { BUSINESS } from "@/lib/business";

export const dynamic = "force-dynamic";

type ProductWithCategory = Product & { categories: { slug: string; name: string } | null };

async function getProduct(slug: string) {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from("products")
    .select("*, categories(slug, name)")
    .eq("slug", slug)
    .maybeSingle();
  return data as ProductWithCategory | null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };

  const name = displayName(product.name);
  const priceText = hasPrice(product.price) ? formatKES(product.price) : "Ask for price";
  const description =
    product.description?.trim().slice(0, 160) ||
    `${name} - ${priceText}. Order on WhatsApp from Chaaz Builders, delivered across Nairobi and its environs.`;
  const image = product.image_url ?? "/og-image.jpg";

  return {
    title: hasPrice(product.price) ? `${name} - ${priceText}` : name,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: hasPrice(product.price) ? `${name} - ${priceText}` : name,
      description,
      url: `/shop/${product.slug}`,
      type: "website",
      images: [{ url: image, alt: name }],
    },
    twitter: { card: "summary_large_image", title: name, description, images: [image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const supabase = getServiceSupabase();
  let relatedQuery = supabase.from("products").select("*").neq("id", product.id).gt("stock", 0);
  if (product.category_id) relatedQuery = relatedQuery.eq("category_id", product.category_id);
  const { data: related } = await relatedQuery.limit(4);

  const name = displayName(product.name);
  const url = `${BUSINESS.siteUrl}/shop/${product.slug}`;
  const images = [product.image_url, ...(Array.isArray(product.images) ? product.images : [])].filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name,
            sku: product.slug,
            url,
            ...(images.length ? { image: images } : {}),
            description: product.description?.trim() || `${name} from Chaaz Builders, Nairobi.`,
            ...(product.categories ? { category: product.categories.name } : {}),
            ...(hasPrice(product.price) ? { offers: {
              "@type": "Offer",
              url,
              priceCurrency: "KES",
              price: parseFloat(product.price),
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
              seller: { "@type": "Organization", name: BUSINESS.name },
            } } : {}),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.siteUrl },
              { "@type": "ListItem", position: 2, name: "Shop", item: `${BUSINESS.siteUrl}/shop` },
              ...(product.categories
                ? [{ "@type": "ListItem", position: 3, name: product.categories.name, item: `${BUSINESS.siteUrl}/shop?category=${product.categories.slug}` }]
                : []),
              { "@type": "ListItem", position: product.categories ? 4 : 3, name, item: url },
            ],
          },
        ]}
      />
      <ProductPageClient product={product} category={product.categories} related={(related ?? []) as Product[]} />
    </>
  );
}
