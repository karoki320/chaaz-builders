"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Logo } from "@/components/Logo";
import type { Category } from "@/lib/types";

const PHONE_DISPLAY = "0741 164235";
const PHONE_TEL = "+254741164235";

export function Navbar({ categories }: { categories: Category[] }) {
  const { count } = useCart();
  const { ids } = useWishlist();
  const [megaOpen, setMegaOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="max-w-6xl mx-auto glass rounded-xl3 shadow-soft">
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-700">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="flex items-center gap-1">
                Shop <span className="text-xs">▾</span>
              </button>
              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[520px]">
                  <div className="glass rounded-xl2 shadow-card p-5 grid grid-cols-3 gap-3">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/shop?category=${c.slug}`}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/70 transition"
                      >
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <form action="/shop" className="hidden md:flex items-center flex-1 max-w-xs">
            <input
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full bg-white/70 border border-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-light"
            />
          </form>

          <div className="flex items-center gap-4">
            <a href={`tel:${PHONE_TEL}`} className="hidden sm:block text-sm text-accent font-semibold">
              📞 {PHONE_DISPLAY}
            </a>
            <Link href="/wishlist" className="relative text-lg" aria-label="Wishlist">
              ♡
              {ids.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gradient text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {ids.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative text-sm font-semibold text-brand-dark">
              🛒
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gradient text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
