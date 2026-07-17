"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BlogForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", coverIcon: "📝" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    setForm({ title: "", excerpt: "", content: "", coverIcon: "📝" });
    router.refresh();
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
      <input
        placeholder="Emoji icon"
        className="border rounded px-3 py-2"
        value={form.coverIcon}
        onChange={(e) => setForm({ ...form, coverIcon: e.target.value })}
      />
      <input
        placeholder="Short excerpt (optional)"
        className="border rounded px-3 py-2"
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
