"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon, Icon } from "@/components/Icon";
import type { Category, Product } from "@/lib/types";

type BrowserProduct = Product & { categories?: { slug: string; name: string } | null };

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export function ProductBrowser({
  products,
  categories,
  initialQuery = "",
  initialCategory = "all",
  heading = "All Products",
  asPageTitle = false,
}: {
  products: BrowserProduct[];
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
  heading?: string;
  asPageTitle?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>(initialCategory);
  const Heading = asPageTitle ? "h1" : "h2";
  const [sort, setSort] = useState<SortKey>("featured");

  // Only show categories that actually have products, with a count on each chip.
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of products) {
      const slug = p.categories?.slug;
      if (slug) m.set(slug, (m.get(slug) ?? 0) + 1);
    }
    return m;
  }, [products]);
  const visibleCategories = categories.filter((c) => (counts.get(c.slug) ?? 0) > 0);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    const filtered = products.filter((p) => {
      if (category !== "all" && p.categories?.slug !== category) return false;
      if (terms.length === 0) return true;
      const haystack = `${p.name} ${p.description ?? ""} ${p.categories?.name ?? ""}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });

    const sorted = [...filtered];
    const p = (x: BrowserProduct) => parseFloat(x.price) || 0;
    if (sort === "price-asc") sorted.sort((a, b) => (p(a) > 0 ? p(a) : Infinity) - (p(b) > 0 ? p(b) : Infinity));
    else if (sort === "price-desc") sorted.sort((a, b) => p(b) - p(a));
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else
      sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.stock > 0) - Number(a.stock > 0) ||
          a.name.localeCompare(b.name)
      );
    return sorted;
  }, [products, query, category, sort]);

  const chip = (active: boolean) =>
    `flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border text-sm transition-colors ${
      active ? "bg-brand-gradient text-white border-transparent" : "bg-white text-neutral-700 hover:border-brand/40"
    }`;

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 pt-10 pb-16 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
        <div>
          <Heading className="text-2xl sm:text-3xl font-bold text-brand-dark">{heading}</Heading>
          <p className="text-neutral-500 text-sm mt-1">
            {results.length} {results.length === 1 ? "product" : "products"}
            {category !== "all" && ` in ${categories.find((c) => c.slug === category)?.name ?? ""}`}
            {query.trim() && ` matching "${query.trim()}"`}
          </p>
        </div>
      </div>

      {/* Search + sort */}
      <div className="sticky top-[68px] sm:top-[84px] z-30 -mx-4 px-4 py-3 bg-surface/95 backdrop-blur">
        <div className="flex gap-2">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sinks, pipes, paint, tiles..."
              className="w-full rounded-full bg-white border border-neutral-200 pl-11 pr-10 py-3 text-base sm:text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-light"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort products"
            className="rounded-full bg-white border border-neutral-200 px-3 sm:px-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-light"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto mt-3 pb-1 -mx-4 px-4 [scrollbar-width:none]">
          <button type="button" onClick={() => setCategory("all")} className={chip(category === "all")}>
            All <span className="opacity-70">({products.length})</span>
          </button>
          {visibleCategories.map((c) => (
            <button key={c.id} type="button" onClick={() => setCategory(c.slug)} className={chip(category === c.slug)}>
              <CategoryIcon slug={c.slug} size={16} />
              {c.name} <span className="opacity-70">({counts.get(c.slug)})</span>
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <Icon name="search" size={36} className="mx-auto mb-3 text-neutral-300" />
          <p className="font-medium text-neutral-700">No products found</p>
          <p className="text-sm mt-1">Try a different word or category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 rounded-full border px-5 py-2 text-sm text-brand-dark hover:border-brand/40"
          >
            Show all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
