"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { formatKES } from "@/lib/utils";
import { Icon } from "@/components/Icon";

// Sticky "view cart" bar on phones once something is in the cart.
// Hidden on cart/checkout and on product pages (they have their own sticky bar).
export function MobileCartBar() {
  const { count, subtotal } = useCart();
  const pathname = usePathname() ?? "";

  if (count === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout") || pathname.startsWith("/shop/")) return null;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <Link
        href="/cart"
        className="flex items-center justify-between gap-3 rounded-full bg-brand-dark text-white pl-5 pr-2 py-2 shadow-card"
      >
        <span className="flex items-center gap-2 text-sm">
          <Icon name="cart" size={18} />
          {count} {count === 1 ? "item" : "items"} · <strong>{formatKES(subtotal)}</strong>
        </span>
        <span className="flex items-center gap-1 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold">
          Checkout <Icon name="arrow-right" size={16} />
        </span>
      </Link>
    </div>
  );
}
