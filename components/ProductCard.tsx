"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatKES } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.image_url ?? undefined,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="relative"
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group block overflow-hidden rounded-xl3 bg-white shadow-soft transition-shadow hover:shadow-card"
      >
        <div className="relative h-40 bg-surface flex items-center justify-center">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl">{product.icon ?? "🧱"}</span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(product.id);
            }}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full glass text-sm"
            aria-label="Toggle wishlist"
          >
            {wished ? "❤️" : "🤍"}
          </button>

          <button
            onClick={quickAdd}
            disabled={product.stock === 0}
            className="absolute bottom-2 left-2 right-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all rounded-full bg-brand-gradient text-white text-xs font-semibold py-2 disabled:opacity-0"
          >
            Quick Add
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 text-neutral-800">{product.name}</h3>
          <p className="text-gradient-brand font-bold mt-1">{formatKES(product.price)}</p>
          <p className="text-xs text-neutral-500 mt-1">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
