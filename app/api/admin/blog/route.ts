import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = getServiceSupabase();

  const { error } = await supabase.from("blog_posts").insert({
    title: body.title,
    slug: `${slugify(body.title)}-${Date.now().toString(36)}`,
    excerpt: body.excerpt || null,
    content: body.content,
    cover_icon: body.coverIcon || "📝",
    published: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
