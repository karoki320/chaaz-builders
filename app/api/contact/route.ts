import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message } = body;
  if (!name || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("contact_messages").insert({ name, email, phone, message });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
