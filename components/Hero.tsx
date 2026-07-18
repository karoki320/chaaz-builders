"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  image: string;
  headline: string;
  highlight: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
};

const slides: Slide[] = [
  {
    image: "/hero/hero-1.jpg",
    headline: "Complete",
    highlight: "Bathroom Solutions",
    subheading: "Premium sinks, showers and toilets - built to last, priced to work.",
    ctaLabel: "Shop Bathroom",
    ctaHref: "/shop?category=bathroom",
  },
  {
    image: "/hero/hero-2.jpg",
    headline: "Built For",
    highlight: "Every Pipeline",
    subheading: "Kitchen sinks, valves and industrial-grade pipes - genuine, and always in stock.",
    ctaLabel: "Shop Plumbing",
    ctaHref: "/shop?category=plumbing",
  },
  {
    image: "/hero/hero-3.jpg",
    headline: "Everything For",
    highlight: "Your Build",
    subheading: "Cement, electrical, tools and fittings - one store, every project covered.",
    ctaLabel: "Shop All Products",
    ctaHref: "/shop",
  },
];

const badges = ["Genuine Products", "Fast Delivery", "Affordable Prices", "Expert Support"];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden h-[520px] sm:h-[560px] md:h-[640px]">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.highlight}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80 sm:hidden" />
          <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-white via-white/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative max-w-6xl mx-auto px-4 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.headline + slide.highlight}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-lg"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-brand-dark">
              {slide.headline}
              <br />
              <span className="text-gradient-brand">{slide.highlight}</span>
            </h1>
            <p className="mt-5 text-neutral-600 text-lg max-w-md">{slide.subheading}</p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href={slide.ctaHref}
                className="text-center rounded-full bg-brand-gradient text-white px-8 py-3.5 font-semibold shadow-glow transition-transform active:scale-95 sm:hover:scale-105"
              >
                {slide.ctaLabel}
              </Link>
              <Link
                href="#categories"
                className="text-center rounded-full bg-white/80 border border-brand/20 px-8 py-3.5 font-semibold text-brand-dark backdrop-blur transition-transform active:scale-95 sm:hover:scale-105"
              >
                Browse Categories
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
              {badges.map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <span className="text-accent">✓</span> {b}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.image}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-brand-gradient" : "w-2 bg-neutral-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
