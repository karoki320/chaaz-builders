import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 120) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });
  if (error && !error.message.includes("duplicate")) {
    console.error("[Newsletter] insert failed:", error);
    return NextResponse.json({ error: "Could not subscribe, please try again" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
