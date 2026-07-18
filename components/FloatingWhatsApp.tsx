"use client";

import { whatsappLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hi Chaaz Builders, I have a question.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-green-gradient text-white text-xl sm:text-2xl shadow-glow-green transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
