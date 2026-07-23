import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

async function uniqueSlug(base: string, excludeId: number) {
  const supabase = getServiceSupabase();
  const cleanBase = base || "product";
  let candidate = cleanBase;
  let suffix = 2;

  while (true) {
    const { data } = await supabase
      .from("products")
      .select("id")
      .eq("slug", candidate)
      .neq("id", excludeId)
      .maybeSingle();
    if (!data) return candidate;
    candidate = `${cleanBase}-${suffix}`;
    suffix += 1;
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const supabase = getServiceSupabase();

  const slug = await uniqueSlug(slugify(body.slug?.trim() || body.name || ""), parseInt(id));

  const update: Record<string, unknown> = {
    name: body.name,
    slug,
    category_id: body.categoryId || null,
    price: body.price,
    stock: parseInt(body.stock) || 0,
    description: body.description || null,
    updated_at: new Date().toISOString(),
  };
  if (body.imageUrl) update.image_url = body.imageUrl;

  const { error } = await supabase.from("products").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slug });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
