"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/shop?category=${category.slug}`}
        className="group relative flex flex-col items-center justify-center gap-2 rounded-xl3 bg-white p-6 text-center shadow-soft transition-shadow hover:shadow-card overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
        <div className="text-4xl">{category.icon ?? "📦"}</div>
        <div className="text-sm font-semibold text-neutral-800">{category.name}</div>
      </Link>
    </motion.div>
  );
}
