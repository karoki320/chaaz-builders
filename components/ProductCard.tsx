"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { displayName, formatKES, hasPrice, stockLabel } from "@/lib/utils";
import { productWhatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Icon } from "@/components/Icon";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const wished = has(product.id);
  const stock = stockLabel(product.stock);
  const name = displayName(product.name);
  const price = parseFloat(product.price);
  const priced = hasPrice(price);

  function quickAdd() {
    addItem({
      productId: product.id,
      name,
      price,
      quantity: 1,
      image: product.image_url ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-100 shadow-soft transition-shadow hover:shadow-card">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-square bg-white">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
              <Icon name="box" size={48} className="text-neutral-300" />
            </div>
          )}
          {stock.tone === "out" && (
            <span className="absolute left-2 top-2 rounded-full bg-neutral-800/80 px-2.5 py-1 text-[11px] font-medium text-white">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggle(product.id)}
        className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Icon name="heart" size={17} filled={wished} className={wished ? "text-red-500" : "text-neutral-500"} />
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-4 border-t border-neutral-100">
        <Link href={`/shop/${product.slug}`} className="font-medium text-sm leading-snug line-clamp-2 text-neutral-800 hover:text-brand">
          {name}
        </Link>
        <p
          className={`text-xs mt-1 ${
            stock.tone === "out" ? "text-neutral-400" : stock.tone === "low" ? "text-amber-600" : "text-accent-dark"
          }`}
        >
          {stock.text}
        </p>

        <p className="mt-auto pt-2 font-bold text-brand-dark text-base">
          {priced ? formatKES(price) : <span className="text-sm text-neutral-500 font-semibold">Ask for price</span>}
        </p>
        {!priced ? (
          <a
            href={productWhatsappLink(name, 0)}
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 flex h-9 items-center justify-center gap-1.5 rounded-full bg-green-gradient text-white text-xs font-semibold"
          >
            <Icon name="whatsapp" size={16} /> Get price
          </a>
        ) : (
        <div className="mt-2.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={quickAdd}
            disabled={stock.tone === "out"}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-gradient text-white text-xs font-semibold disabled:opacity-30 transition-transform active:scale-95"
          >
            <Icon name={added ? "check" : "cart"} size={16} />
            {added ? "Added" : "Add"}
          </button>
          <a
            href={productWhatsappLink(name, price)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Order ${name} on WhatsApp`}
            title="Order on WhatsApp"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent-dark hover:bg-accent/10"
          >
            <Icon name="whatsapp" size={17} />
          </a>
        </div>
        )}
      </div>
    </div>
  );
}
