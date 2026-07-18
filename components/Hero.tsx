"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const showcaseItems = [
  { icon: "🚿", label: "Chrome Faucets", top: "6%", left: "8%", size: "text-5xl", delay: 0, color: "from-brand to-brand-light" },
  { icon: "🛁", label: "Luxury Sinks", top: "2%", left: "52%", size: "text-6xl", delay: 0.6, color: "from-accent to-accent-light" },
  { icon: "🚽", label: "Toilets", top: "34%", left: "72%", size: "text-5xl", delay: 1.2, color: "from-brand to-accent" },
  { icon: "⚙️", label: "Water Pumps", top: "56%", left: "6%", size: "text-5xl", delay: 0.3, color: "from-accent to-brand" },
  { icon: "🧵", label: "PVC Pipes", top: "62%", left: "48%", size: "text-4xl", delay: 0.9, color: "from-brand-light to-brand" },
  { icon: "🧱", label: "Building Materials", top: "78%", left: "20%", size: "text-5xl", delay: 1.5, color: "from-accent-dark to-accent" },
];

const badges = ["Genuine Products", "Fast Delivery", "Affordable Prices", "Expert Support"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-white">
      {/* background glow orbs */}
      <div className="pointer-events-none absolute -top-40 -left-20 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            <span className="text-gradient-brand">CHAAZ</span>
            <br />
            <span className="text-gradient-blue">BUILDERS</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl font-medium text-white/90">
            Quality Plumbing &amp; Building Solutions for Every Project.
          </p>
          <p className="mt-3 text-white/70 max-w-md">
            From bathroom fittings to full-site cement and steel supply - genuine materials,
            stocked and ready, delivered fast across Kenya.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-brand-gradient px-8 py-3.5 font-semibold shadow-glow transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="#categories"
              className="rounded-full glass px-8 py-3.5 font-semibold text-white border border-white/30 transition-transform hover:scale-105"
            >
              Browse Categories
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {badges.map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <span className="text-accent-light">✓</span> {b}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative h-[420px] hidden md:block">
          {showcaseItems.map((item) => (
            <motion.div
              key={item.label}
              className="absolute"
              style={{ top: item.top, left: item.left }}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            >
              <div
                className={`relative flex flex-col items-center justify-center w-28 h-28 rounded-full glass shadow-card bg-gradient-to-br ${item.color} bg-opacity-20`}
              >
                <span className={item.size}>{item.icon}</span>
              </div>
              <p className="mt-2 text-center text-xs text-white/70 w-28">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
