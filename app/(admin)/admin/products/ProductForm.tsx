"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export function ProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    categoryId: categories[0]?.id ?? "",
    price: "",
    stock: "0",
    description: "",
    icon: "🧱",
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    setForm({ ...form, name: "", price: "", stock: "0", description: "" });
    router.refresh();
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
      <input
        placeholder="Emoji icon"
        className="border rounded px-3 py-2"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="border rounded px-3 py-2 col-span-2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
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
