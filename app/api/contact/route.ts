import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  // Hidden "website" field: real people leave it empty, spam bots fill it in.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 120) || null;
  const phone = clean(body.phone, 20) || null;
  const message = clean(body.message, 3000);
  if (!name || !message) {
    return NextResponse.json({ error: "Please fill in your name and message" }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("contact_messages").insert({ name, email, phone, message });
  if (error) {
    console.error("[Contact] insert failed:", error);
    return NextResponse.json({ error: "Could not send your message, please try again" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
