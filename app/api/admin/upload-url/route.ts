import { adminDenied } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/server";

// Issues a one-time signed upload URL for the "media" bucket.
// Protected by the admin PIN session via middleware (/api/admin/*).
export async function POST(req: NextRequest) {
  const denied = await adminDenied(req);
  if (denied) return denied;
  const { folder, ext } = await req.json().catch(() => ({}));
  if (folder !== "products" && folder !== "blog") {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }
  const safeExt = String(ext || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;

  const supabase = getServiceSupabase();
  const { data, error } = await supabase.storage.from("media").createSignedUploadUrl(path);
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Could not create upload URL" }, { status: 500 });
  }
  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
  return NextResponse.json({ path, token: data.token, publicUrl: pub.publicUrl });
}
