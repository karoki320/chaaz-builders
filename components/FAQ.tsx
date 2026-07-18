"use client";

import { useState } from "react";

const faqs = [
  { q: "How fast is delivery?", a: "Most in-stock orders in Nairobi and Thika are delivered the same day. Upcountry orders typically take 1-3 days." },
  { q: "How do I pay?", a: "Pay securely via M-Pesa at checkout - you'll get an STK push prompt on your phone." },
  { q: "Can I order by WhatsApp instead?", a: "Yes - every product has a WhatsApp button, or message us directly using the floating chat button." },
  { q: "Do you offer installation?", a: "Select products list installation availability on their product page - ask our team for details." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-brand-dark text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div key={item.q} className="rounded-xl2 bg-white shadow-soft overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-neutral-800"
            >
              {item.q}
              <span className="text-brand">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="px-5 pb-4 text-sm text-neutral-600">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
