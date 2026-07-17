import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatKES } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="border rounded-lg p-4 hover:shadow-md transition block bg-white"
    >
      <div className="text-4xl mb-2">{product.icon ?? "🧱"}</div>
      <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
      <p className="text-brand-dark font-semibold mt-1">{formatKES(product.price)}</p>
      <p className="text-xs text-neutral-500 mt-1">
        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>
    </Link>
  );
}
