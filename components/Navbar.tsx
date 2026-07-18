"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 sm:top-4 z-50 px-0 sm:px-4">
      <div className="max-w-6xl mx-auto glass sm:rounded-xl3 shadow-soft">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3">
          <Link href="/" onClick={() => setMenuOpen(false)}>
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

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:flex items-center min-h-[44px] px-2 text-sm text-accent font-semibold"
            >
              📞 {PHONE_DISPLAY}
            </a>
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center min-w-[44px] min-h-[44px] text-lg"
              aria-label="Wishlist"
            >
              ♡
              {ids.length > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gradient text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {ids.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center justify-center min-w-[44px] min-h-[44px] text-lg text-brand-dark"
              aria-label="Cart"
            >
              🛒
              {count > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gradient text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] text-2xl"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-white/40"
            >
              <div className="px-5 py-4 flex flex-col gap-1 text-neutral-700">
                <form action="/shop" className="flex mb-3 md:hidden">
                  <input
                    name="q"
                    placeholder="Search products..."
                    className="w-full rounded-full bg-white/80 border border-white/60 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-light"
                  />
                </form>

                <Link href="/shop" onClick={() => setMenuOpen(false)} className="min-h-[44px] flex items-center font-medium">
                  Shop
                </Link>
                <div className="pl-3 flex flex-col gap-1 mb-1">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?category=${c.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="min-h-[40px] flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <span>{c.icon}</span> {c.name}
                    </Link>
                  ))}
                </div>
                <Link href="/blog" onClick={() => setMenuOpen(false)} className="min-h-[44px] flex items-center font-medium">
                  Blog
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="min-h-[44px] flex items-center font-medium">
                  About
                </Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="min-h-[44px] flex items-center font-medium">
                  Contact
                </Link>
                <a href={`tel:${PHONE_TEL}`} className="min-h-[44px] flex items-center font-medium text-accent">
                  📞 {PHONE_DISPLAY}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
