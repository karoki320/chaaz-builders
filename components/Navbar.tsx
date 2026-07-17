"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const { count } = useCart();
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-lg text-brand-dark">
          Chaaz Builders
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/shop">Shop</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link href="/cart" className="relative text-sm font-medium">
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
