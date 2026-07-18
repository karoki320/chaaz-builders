"use client";

import { motion } from "framer-motion";

// SAMPLE PLACEHOLDER CONTENT - replace with real customer quotes before launch.
// Displaying fabricated testimonials to real customers is misleading; swap these
// out (or wire to a Supabase-backed reviews table) once you have genuine feedback.
const testimonials = [
  { name: "Sample Customer", role: "Contractor, Nairobi", quote: "Replace this with a real customer quote." },
  { name: "Sample Customer", role: "Homeowner, Thika", quote: "Replace this with a real customer quote." },
  { name: "Sample Customer", role: "Site Manager", quote: "Replace this with a real customer quote." },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl3 bg-surface p-6 shadow-soft"
            >
              <p className="text-neutral-700 italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 font-semibold text-sm text-neutral-800">{t.name}</p>
              <p className="text-xs text-neutral-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
