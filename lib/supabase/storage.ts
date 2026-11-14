"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";

// Uploads a file to the public "media" bucket and returns its public URL.
// The server (behind the admin PIN) issues a one-time signed upload URL,
// so no Supabase login is needed in the browser.
export async function uploadMediaFile(file: File, folder: "products" | "blog"): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const res = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder, ext }),
  });
  if (res.status === 401) throw new Error("Your admin session expired - please log in again.");
  if (!res.ok) throw new Error("Upload failed: could not get an upload link.");
  const { path, token, publicUrl } = (await res.json()) as { path: string; token: string; publicUrl: string };

  const supabase = getBrowserSupabase();
  const { error } = await supabase.storage.from("media").uploadToSignedUrl(path, token, file, {
    cacheControl: "3600",
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return publicUrl;
}
