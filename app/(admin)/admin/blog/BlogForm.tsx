"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadMediaFile } from "@/lib/supabase/storage";

export function BlogForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", excerpt: "", content: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setUploadError(null);
    try {
      let coverImageUrl: string | null = null;
      if (imageFile) {
        coverImageUrl = await uploadMediaFile(imageFile, "blog");
      }

      await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, coverImageUrl }),
      });

      setForm({ title: "", excerpt: "", content: "" });
      setImageFile(null);
      setImagePreview(null);
      router.refresh();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
      <input
        required
        placeholder="Title"
        className="border rounded px-3 py-2 col-span-2"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <div className="col-span-2 flex items-center gap-3">
        <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
        {imagePreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagePreview} alt="Preview" className="w-14 h-14 object-cover rounded border" />
        )}
      </div>

      <input
        placeholder="Short excerpt (optional)"
        className="border rounded px-3 py-2 col-span-2"
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
      />
      <textarea
        required
        placeholder="Post content"
        rows={6}
        className="border rounded px-3 py-2 col-span-2"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      {uploadError && <p className="text-red-600 text-sm col-span-2">{uploadError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="col-span-2 bg-brand text-white py-2 rounded-md font-medium"
      >
        {submitting ? "Saving..." : "Save as draft"}
      </button>
    </form>
  );
}
