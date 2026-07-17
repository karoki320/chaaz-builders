"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6">Contact us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          className="w-full border rounded px-3 py-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <textarea
          required
          placeholder="Message"
          className="w-full border rounded px-3 py-2"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-brand text-white py-3 rounded-md font-medium"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        {status === "sent" && <p className="text-green-700 text-sm">Message sent - we'll get back to you.</p>}
        {status === "error" && <p className="text-red-600 text-sm">Something went wrong, try again.</p>}
      </form>
    </div>
  );
}
