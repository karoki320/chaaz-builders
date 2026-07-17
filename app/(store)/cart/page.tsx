"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { formatKES } from "@/lib/utils";

const DELIVERY_FEE = 300;

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-500 mb-4">Your cart is empty.</p>
        <Link href="/shop" className="text-brand-dark underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const total = subtotal + DELIVERY_FEE;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-neutral-500">{formatKES(item.price)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                className="w-14 border rounded px-2 py-1 text-center"
              />
              <button onClick={() => removeItem(item.productId)} className="text-red-600 text-sm">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatKES(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{formatKES(DELIVERY_FEE)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t">
          <span>Total</span>
          <span>{formatKES(total)}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block text-center bg-brand text-white py-3 rounded-md font-medium"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}
