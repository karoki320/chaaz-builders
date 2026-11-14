import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceSupabase } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import { displayName, formatKES } from "@/lib/utils";
import { ProductPageClient } from "./ProductPageClient";

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
  if (!product) return { title: "Product not found | Chaaz Builders" };

  const name = displayName(product.name);
  const description =
    product.description?.slice(0, 160) ??
    `${name} - ${formatKES(product.price)}. Order on WhatsApp from Chaaz Builders, delivered across Nairobi and its environs.`;
  const image = product.image_url ?? "/og-image.jpg";

  return {
    title: `${name} | Chaaz Builders`,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${name} - ${formatKES(product.price)}`,
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

  return (
    <ProductPageClient
      product={product}
      category={product.categories}
      related={(related ?? []) as Product[]}
    />
  );
}
