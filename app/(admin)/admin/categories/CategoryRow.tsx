"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export function CategoryRow({ category }: { category: Category }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: category.name,
    icon: category.icon ?? "📦",
    description: category.description ?? "",
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      setEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${category.name}"? Products in it will become uncategorized, not deleted.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });
    router.refresh();
  }

  if (editing) {
    return (
      <form onSubmit={handleSave} className="border rounded-lg p-4 bg-white grid grid-cols-1 sm:grid-cols-[1fr_80px] gap-3">
        <input
          required
          className="border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border rounded px-3 py-2 text-center"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />
        <input
          placeholder="Description"
          className="border rounded px-3 py-2 sm:col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {error && <p className="text-red-600 text-sm sm:col-span-2">{error}</p>}
        <div className="sm:col-span-2 flex gap-2">
          <button type="submit" disabled={submitting} className="flex-1 bg-brand text-white py-2 rounded-md font-medium disabled:opacity-50">
            {submitting ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-md border text-sm">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl">{category.icon}</span>
        <div className="min-w-0">
          <p className="font-medium truncate">{category.name}</p>
          {category.description && <p className="text-sm text-neutral-500 truncate">{category.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => setEditing(true)} className="text-sm border rounded px-3 min-h-[40px]">
          Edit
        </button>
        <button onClick={handleDelete} disabled={deleting} className="text-sm text-red-600 px-3 min-h-[40px] disabled:opacity-50">
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
