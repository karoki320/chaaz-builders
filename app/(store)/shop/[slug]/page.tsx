import { notFound } from "next/navigation";
import { getServiceSupabase } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import { ProductPageClient } from "./ProductPageClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getServiceSupabase();
  const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();

  if (!data) notFound();

  return <ProductPageClient product={data as Product} />;
}
