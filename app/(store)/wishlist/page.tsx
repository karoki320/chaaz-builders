"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (ids.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const supabase = getBrowserSupabase();
      const { data } = await supabase.from("products").select("*").in("id", ids);
      setProducts((data ?? []) as Product[]);
      setLoading(false);
    }
    load();
  }, [ids]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {loading ? (
        <p className="text-neutral-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-neutral-500">
          Nothing saved yet - tap the heart on any product to add it here.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
