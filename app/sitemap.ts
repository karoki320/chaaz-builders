import type { MetadataRoute } from "next";
import { getServiceSupabase } from "@/lib/supabase/server";

const BASE = "https://www.chaazbuilders.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getServiceSupabase();
  const { data } = await supabase.from("products").select("slug");
  const products = (data ?? []).map((p: { slug: string }) => ({
    url: `${BASE}/shop/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.4 },
    ...products,
  ];
}
