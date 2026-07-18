"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatKES } from "@/lib/utils";
import { productWhatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/contexts/CartContext";

export function ProductPageClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity,
      image: product.image_url ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 pb-28 sm:pb-8">
      <p className="text-xs text-neutral-500 mb-4 sm:mb-6">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/shop" className="hover:text-brand">Shop</Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700">{product.name}</span>
      </p>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div className="relative bg-neutral-100 rounded-xl3 flex items-center justify-center h-64 sm:h-72 text-7xl overflow-hidden">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          ) : (
            product.icon ?? "🧱"
          )}
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">{product.name}</h1>
          <p className="text-brand-dark text-xl font-bold mt-2">{formatKES(product.price)}</p>
          <p className="text-sm text-neutral-500 mt-1">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {product.description && <p className="mt-4 text-neutral-700">{product.description}</p>}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <table className="mt-4 text-sm w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-1 pr-4 text-neutral-500">{key}</td>
                    <td className="py-1">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Desktop / tablet add-to-cart - hidden on mobile in favor of the sticky bar below */}
          <div className="hidden sm:flex items-center gap-3 mt-6">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 border rounded px-2 py-2.5 text-center"
            />
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-brand text-white px-6 py-2.5 rounded-md font-medium disabled:opacity-50"
            >
              {added ? "Added!" : "Add to cart"}
            </button>
          </div>

          <a
            href={productWhatsappLink(product.name, parseFloat(product.price))}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center min-h-[44px] text-sm text-green-700 underline"
          >
            Ask about this on WhatsApp
          </a>
        </div>
      </div>

      {/* Sticky mobile add-to-cart bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/40 px-4 py-3 flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 border rounded px-2 py-3 text-center bg-white"
        />
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 bg-brand-gradient text-white py-3 rounded-full font-semibold disabled:opacity-50"
        >
          {added ? "Added!" : `Add to cart - ${formatKES(product.price)}`}
        </button>
      </div>
    </div>
  );
}
