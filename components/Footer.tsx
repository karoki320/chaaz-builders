import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t mt-16 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <Logo />
          <p className="text-sm text-neutral-600 mt-2">📞 0741 164235</p>
          <p className="text-xs text-neutral-500 mt-1">Everything for your build.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 text-sm text-neutral-600">
          <div className="flex flex-col gap-2">
            <Link href="/shop">Shop</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t text-center text-xs text-neutral-500 py-4">
        &copy; {new Date().getFullYear()} Chaaz Builders. All rights reserved.
      </div>
    </footer>
  );
}
