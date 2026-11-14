"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { formatKES } from "@/lib/utils";
import { orderDetailsWhatsappLink } from "@/lib/whatsapp";
import { DELIVERY_FEE } from "@/lib/shop-config";

export function CheckoutClient() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal + DELIVERY_FEE;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");

      // Build the full order recap (customer info + itemized basket) and
      // send the customer straight to WhatsApp to complete the sale, since
      // payments now happen there instead of via M-Pesa STK push.
      const waLink = orderDetailsWhatsappLink({
        orderNumber: data.orderNumber,
        name: form.name,
        phone: form.phone,
        address: form.address,
        // Use the server-confirmed prices and totals.
        items: data.items,
        subtotal: data.subtotal,
        deliveryFee: data.deliveryFee,
        total: data.total,
      });

      clear();
      window.open(waLink, "_blank");
      router.push(`/order-confirmation/${data.orderId}?t=${data.token}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return <p className="max-w-md mx-auto px-4 py-16 text-center text-neutral-500">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Full name"
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          placeholder="Phone number (07XXXXXXXX)"
          className="w-full border rounded px-3 py-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          required
          placeholder="Delivery address"
          className="w-full border rounded px-3 py-2"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <div className="text-sm border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatKES(total)}</span>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand text-white py-3 rounded-md font-medium disabled:opacity-50"
        >
          {submitting ? "Sending order..." : "Send Order via WhatsApp"}
        </button>
        <p className="text-xs text-neutral-500 text-center">
          You&apos;ll be taken to WhatsApp to confirm your order and arrange payment.
        </p>
      </form>
    </div>
  );
}
