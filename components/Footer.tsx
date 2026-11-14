import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { BUSINESS } from "@/lib/business";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-navy-gradient text-white/80 pb-20 sm:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Logo full />
          <p className="text-sm mt-4 max-w-xs text-white/60">
            Quality plumbing and building materials, delivered across {BUSINESS.deliveryArea}.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a href={`tel:${BUSINESS.phoneTel}`} className="flex items-center gap-2 hover:text-white">
              <Icon name="phone" size={16} /> {BUSINESS.phoneDisplay}
            </a>
            <a
              href={whatsappLink("Hi Chaaz Builders, I have a question.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <Icon name="whatsapp" size={16} /> Chat on WhatsApp
            </a>
            {BUSINESS.address && (
              <p className="flex items-center gap-2">
                <Icon name="map-pin" size={16} /> {BUSINESS.address}
              </p>
            )}
            {BUSINESS.hours && (
              <p className="flex items-center gap-2">
                <Icon name="clock" size={16} /> {BUSINESS.hours}
              </p>
            )}
          </div>
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
