"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { BUSINESS } from "@/lib/business";
import { whatsappLink } from "@/lib/whatsapp";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
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
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">Contact us</h1>
      <div className="mb-6 space-y-3 rounded-2xl bg-white border border-neutral-100 p-4 text-sm">
        <a href={`tel:${BUSINESS.phoneTel}`} className="flex items-center gap-3 text-brand-dark font-medium">
          <Icon name="phone" size={18} className="text-brand" /> {BUSINESS.phoneDisplay}
        </a>
        <a
          href={whatsappLink("Hi Chaaz Builders, I have a question.")}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-brand-dark font-medium"
        >
          <Icon name="whatsapp" size={18} className="text-accent" /> Chat on WhatsApp
        </a>
        {BUSINESS.address && (
          <a href={BUSINESS.mapUrl ?? "#"} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-brand-dark">
            <Icon name="map-pin" size={18} className="text-brand" />
            <span>
              {BUSINESS.address} <span className="text-brand underline underline-offset-2">Get directions</span>
            </span>
          </a>
        )}
        {BUSINESS.hours && (
          <p className="flex items-center gap-3 text-neutral-600">
            <Icon name="clock" size={18} className="text-brand" /> {BUSINESS.hours}
          </p>
        )}
      </div>
      <p className="text-sm text-neutral-500 mb-4">Or send us a message:</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot for spam bots - hidden from people and screen readers */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
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
