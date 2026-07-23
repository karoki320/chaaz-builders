"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Category, Product } from "@/lib/types";
import { formatKES, slugify } from "@/lib/utils";
import { uploadMediaFile } from "@/lib/supabase/storage";

export function ProductRow({ product, categories }: { product: Product; categories: Category[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: product.name,
    slug: product.slug,
    categoryId: product.category_id ? String(product.category_id) : "",
    price: String(product.price),
    stock: String(product.stock),
    description: product.description ?? "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categoryName = categories.find((c) => c.id === product.category_id)?.name ?? "Uncategorized";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      let imageUrl: string | undefined;
      if (imageFile) imageUrl = await uploadMediaFile(imageFile, "products");

      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save changes");

      setEditing(false);
      setImageFile(null);
      setImagePreview(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    router.refresh();
  }

  if (editing) {
    return (
      <div className="border rounded-lg p-4 bg-white">
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          <div className="sm:col-span-2">
            <input
              placeholder="URL slug"
              className="border rounded px-3 py-2 w-full"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              onBlur={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
            />
            <p className="text-xs text-neutral-400 mt-1">/shop/{form.slug || "your-product-slug"}</p>
          </div>

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

          <div className="sm:col-span-2 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded border bg-neutral-100 overflow-hidden shrink-0">
              {(imagePreview || product.image_url) && (
                <Image src={imagePreview || product.image_url!} alt="" fill sizes="48px" className="object-cover" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
          </div>

          <textarea
            placeholder="Description"
            className="border rounded px-3 py-2 sm:col-span-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {error && <p className="text-red-600 text-sm sm:col-span-2">{error}</p>}

          <div className="sm:col-span-2 flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-brand text-white py-2.5 rounded-md font-medium disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2.5 rounded-md border text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-12 h-12 rounded bg-neutral-100 flex items-center justify-center overflow-hidden shrink-0">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.name} fill sizes="48px" className="object-cover" />
          ) : (
            <span className="text-xl">{product.icon ?? "🧱"}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{product.name}</p>
          <p className="text-sm text-neutral-500">
            {formatKES(product.price)} - {product.stock} in stock - {categoryName}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="flex-1 sm:flex-none text-sm border rounded px-3 min-h-[40px]"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-sm text-red-600 px-3 min-h-[40px] disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
