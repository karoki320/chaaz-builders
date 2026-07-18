"use client";

import { whatsappLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hi Chaaz Builders, I have a question.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-gradient text-white text-2xl shadow-glow-green transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
