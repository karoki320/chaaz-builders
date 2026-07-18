import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-navy-gradient text-white/80 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Logo full />
          <p className="text-sm mt-4 max-w-xs text-white/60">
            Quality plumbing and building materials, stocked and delivered fast across Kenya.
          </p>
          <p className="text-sm mt-4">📞 0741 164235</p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Shop</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/shop">All Products</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/50 py-5">
        &copy; {new Date().getFullYear()} Chaaz Builders. All rights reserved.
      </div>
    </footer>
  );
}
