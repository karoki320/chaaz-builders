"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type NavLink = { href: string; label: string; icon: string };

export function AdminMobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = links.find((l) => pathname?.startsWith(l.href));

  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open admin menu"
          aria-expanded={open}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] -ml-2 text-2xl leading-none"
        >
          ⋮
        </button>
        <p className="font-semibold">{current ? current.label : "Chaaz Admin"}</p>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/30"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-3 top-full mt-1 z-40 w-56 rounded-xl2 bg-white shadow-card border overflow-hidden"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 min-h-[48px] text-sm ${
                    pathname?.startsWith(l.href) ? "bg-neutral-100 font-medium" : ""
                  }`}
                >
                  <span className="text-lg">{l.icon}</span>
                  {l.label}
                </Link>
              ))}
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 min-h-[48px] text-sm border-t text-neutral-500"
              >
                <span className="text-lg">🌐</span>
                View site
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
