import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatKES } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="border rounded-lg overflow-hidden hover:shadow-md transition block bg-white"
    >
      <div className="h-36 bg-neutral-100 flex items-center justify-center">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">{product.icon ?? "🧱"}</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
        <p className="text-brand-dark font-semibold mt-1">{formatKES(product.price)}</p>
        <p className="text-xs text-neutral-500 mt-1">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </div>
    </Link>
  );
}
