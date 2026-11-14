import { adminDenied } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const denied = await adminDenied(req);
  if (denied) return denied;
  const body = await req.json();
  const supabase = getServiceSupabase();

  const { error } = await supabase.from("categories").insert({
    name: body.name,
    slug: slugify(body.name),
    icon: body.icon || null,
    description: body.description || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
