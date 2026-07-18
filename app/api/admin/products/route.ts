import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = getServiceSupabase();

  const { error } = await supabase.from("products").insert({
    name: body.name,
    slug: `${slugify(body.name)}-${Date.now().toString(36)}`,
    category_id: body.categoryId || null,
    price: body.price,
    stock: parseInt(body.stock) || 0,
    description: body.description || null,
    image_url: body.imageUrl || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
