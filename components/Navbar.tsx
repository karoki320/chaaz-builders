"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Logo } from "@/components/Logo";

const PHONE_DISPLAY = "0741 164235";
const PHONE_TEL = "+254741164235";

export function Navbar() {
  const { count } = useCart();
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/shop">Shop</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href={`tel:${PHONE_TEL}`} className="hidden sm:block text-sm text-accent font-semibold">
            📞 {PHONE_DISPLAY}
          </a>
          <Link href="/cart" className="relative text-sm font-medium">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
