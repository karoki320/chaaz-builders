"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";

// Uploads a file to the public "media" bucket and returns its public URL.
// Requires the admin user to be signed in (see supabase/migrations/004_media.sql
// for the storage policies that allow this).
export async function uploadMediaFile(file: File, folder: "products" | "blog"): Promise<string> {
  const supabase = getBrowserSupabase();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
