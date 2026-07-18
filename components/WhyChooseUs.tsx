"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const features = [
  { icon: "🚚", title: "Fast Delivery", desc: "Same-day dispatch on in-stock orders across Kenya." },
  { icon: "🔒", title: "Secure Payments", desc: "Pay safely via M-Pesa, straight to our verified line." },
  { icon: "✅", title: "Quality Products", desc: "Genuine materials from trusted manufacturers only." },
  { icon: "🎧", title: "Customer Support", desc: "Real people on WhatsApp and phone, every working day." },
];

export function WhyChooseUs({ productCount, categoryCount }: { productCount: number; categoryCount: number }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">Why Choose Chaaz Builders</h2>
        <p className="text-neutral-500 mt-2">Built on trust, stocked for speed.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-xl3 bg-white shadow-soft p-6 text-center hover:shadow-card transition-shadow"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-neutral-800">{f.title}</h3>
            <p className="text-sm text-neutral-500 mt-1">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 text-center">
        <div>
          <p className="text-4xl font-extrabold text-gradient-brand">
            <AnimatedCounter value={productCount} suffix="+" />
          </p>
          <p className="text-sm text-neutral-500 mt-1">Products in stock</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-gradient-brand">
            <AnimatedCounter value={categoryCount} />
          </p>
          <p className="text-sm text-neutral-500 mt-1">Product categories</p>
        </div>
      </div>
    </section>
  );
}
