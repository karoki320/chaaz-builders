"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CategoryForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", icon: "📦", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add category");
      setForm({ name: "", icon: "📦", description: "" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr_80px] gap-3">
      <input
        required
        placeholder="Category name"
        className="border rounded px-3 py-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Icon"
        className="border rounded px-3 py-2 text-center"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      />
      <input
        placeholder="Description (optional)"
        className="border rounded px-3 py-2 sm:col-span-2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      {error && <p className="text-red-600 text-sm sm:col-span-2">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 bg-brand text-white py-2.5 rounded-md font-medium disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add category"}
      </button>
    </form>
  );
}
