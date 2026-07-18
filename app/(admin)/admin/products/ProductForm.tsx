"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";
import { uploadMediaFile } from "@/lib/supabase/storage";

export function ProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [form, setForm] = useState<{
    name: string;
    categoryId: string;
    price: string;
    stock: string;
    description: string;
  }>({
    name: "",
    categoryId: categories[0] ? String(categories[0].id) : "",
    price: "",
    stock: "0",
    description: "",
  });
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
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadMediaFile(imageFile, "products");
      }

      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl }),
      });

      setForm({ ...form, name: "", price: "", stock: "0", description: "" });
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
        placeholder="Name"
        className="border rounded px-3 py-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <select
        className="border rounded px-3 py-2"
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        required
        type="number"
        placeholder="Price (KES)"
        className="border rounded px-3 py-2"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        className="border rounded px-3 py-2"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <div className="col-span-2 flex items-center gap-3">
        <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
        {imagePreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagePreview} alt="Preview" className="w-14 h-14 object-cover rounded border" />
        )}
      </div>

      <textarea
        placeholder="Description"
        className="border rounded px-3 py-2 col-span-2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {uploadError && <p className="text-red-600 text-sm col-span-2">{uploadError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="col-span-2 bg-brand text-white py-2 rounded-md font-medium"
      >
        {submitting ? "Saving..." : "Add product"}
      </button>
    </form>
  );
}
