"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { displayName, formatKES, hasPrice, stockLabel } from "@/lib/utils";
import { productWhatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/contexts/CartContext";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { BUSINESS } from "@/lib/business";

export function ProductPageClient({
  product,
  category,
  related,
}: {
  product: Product;
  category: { slug: string; name: string } | null;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const name = displayName(product.name);
  const price = parseFloat(product.price);
  const priced = hasPrice(price);
  const stock = stockLabel(product.stock);
  const gallery = Array.from(
    new Set([product.image_url, ...(Array.isArray(product.images) ? product.images : [])].filter(Boolean) as string[])
  );
  const [active, setActive] = useState(0);
  const activeImage = gallery[active] ?? null;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name,
      price,
      quantity,
      image: product.image_url ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const qtyControl = (
    <div className="flex items-center rounded-full border bg-white">
      <button
        type="button"
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        className="flex h-11 w-10 items-center justify-center text-lg text-neutral-600"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-8 text-center font-medium" aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={() => setQuantity((q) => q + 1)}
        className="flex h-11 w-10 items-center justify-center text-neutral-600"
        aria-label="Increase quantity"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 pb-28 sm:pb-12">
      <p className="text-xs text-neutral-500 mb-4 sm:mb-6 truncate">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/shop" className="hover:text-brand">Shop</Link>
        {category && (
          <>
            <span className="mx-1.5">/</span>
            <Link href={`/shop?category=${category.slug}`} className="hover:text-brand">{category.name}</Link>
          </>
        )}
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700">{name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-2xl bg-white border border-neutral-100 overflow-hidden">
            {activeImage ? (
              <Image
                key={activeImage}
                src={activeImage}
                alt={name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-surface">
                <Icon name="box" size={72} className="text-neutral-300" />
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`relative h-16 w-16 shrink-0 rounded-lg border-2 bg-white overflow-hidden ${
                    i === active ? "border-brand" : "border-transparent"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-brand-dark">{name}</h1>
          <p className="text-2xl font-bold text-brand-dark mt-2">
            {priced ? formatKES(price) : <span className="text-lg text-neutral-500">Price on request</span>}
          </p>
          <p
            className={`text-sm mt-1 font-medium ${
              stock.tone === "out" ? "text-neutral-400" : stock.tone === "low" ? "text-amber-600" : "text-accent-dark"
            }`}
          >
            {stock.text}
          </p>

          {product.description && <p className="mt-4 text-neutral-700 leading-relaxed">{product.description}</p>}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <table className="mt-5 text-sm w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-neutral-100">
                    <td className="py-2 pr-4 text-neutral-500">{key}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Desktop / tablet actions - mobile uses the sticky bar below */}
          {priced && (
          <div className="hidden sm:flex items-center gap-3 mt-6">
            {qtyControl}
            <button
              onClick={handleAddToCart}
              disabled={stock.tone === "out"}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient text-white px-6 py-3 font-semibold disabled:opacity-40"
            >
              <Icon name={added ? "check" : "cart"} size={18} />
              {added ? "Added to cart" : "Add to cart"}
            </button>
          </div>
          )}

          <a
            href={productWhatsappLink(name, price)}
            target="_blank"
            rel="noreferrer"
            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold ${
              priced ? "border-2 border-accent text-accent-dark hover:bg-accent/5" : "bg-green-gradient text-white mt-6"
            }`}
          >
            <Icon name="whatsapp" size={18} /> {priced ? "Order on WhatsApp" : "Ask for price on WhatsApp"}
          </a>

          <div className="mt-6 space-y-3 rounded-2xl bg-white border border-neutral-100 p-4 text-sm">
            <p className="flex gap-3">
              <Icon name="truck" size={20} className="text-brand mt-0.5" />
              <span>
                <strong className="text-neutral-800">Delivery:</strong> {BUSINESS.deliveryNote}
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="whatsapp" size={20} className="text-brand mt-0.5" />
              <span>
                <strong className="text-neutral-800">Payment:</strong> {BUSINESS.paymentNote}
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="shield" size={20} className="text-brand mt-0.5" />
              <span>
                <strong className="text-neutral-800">Genuine:</strong> quality materials from trusted manufacturers.
              </span>
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-brand-dark mb-4">You may also need</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile add-to-cart bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-3">
        {!priced ? (
          <a
            href={productWhatsappLink(name, 0)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-gradient text-white py-3 rounded-full font-semibold text-sm"
          >
            <Icon name="whatsapp" size={18} /> Ask for price on WhatsApp
          </a>
        ) : (
        <>
        {qtyControl}
        <button
          onClick={handleAddToCart}
          disabled={stock.tone === "out"}
          className="flex-1 bg-brand-gradient text-white py-3 rounded-full font-semibold text-sm disabled:opacity-40"
        >
          {stock.tone === "out" ? "Out of stock" : added ? "Added!" : `Add - ${formatKES(price * quantity)}`}
        </button>
        </>
        )}
      </div>
    </div>
  );
}
