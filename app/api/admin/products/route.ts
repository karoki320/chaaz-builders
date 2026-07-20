import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

async function uniqueSlug(base: string) {
  const supabase = getServiceSupabase();
  const cleanBase = base || "product";
  let candidate = cleanBase;
  let suffix = 2;

  while (true) {
    const { data } = await supabase.from("products").select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
    candidate = `${cleanBase}-${suffix}`;
    suffix += 1;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = getServiceSupabase();

  const baseSlug = slugify(body.slug?.trim() || body.name || "");
  const slug = await uniqueSlug(baseSlug);

  const { error } = await supabase.from("products").insert({
    name: body.name,
    slug,
    category_id: body.categoryId || null,
    price: body.price,
    stock: parseInt(body.stock) || 0,
    description: body.description || null,
    image_url: body.imageUrl || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slug });
}
