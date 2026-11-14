import { formatKES } from "./utils";
import { BUSINESS } from "./business";

// Falls back to the shop's WhatsApp number if the env var is missing.
const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS.whatsapp;

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${NUMBER}?text=${encoded}`;
}

export function productWhatsappLink(productName: string, price: number) {
  if (!price || price <= 0) {
    return whatsappLink(`Hi Chaaz Builders, I'm interested in "${productName}". What is the price, and is it in stock?`);
  }
  return whatsappLink(
    `Hi Chaaz Builders, I'm interested in "${productName}" (KES ${price.toLocaleString()}). Is it in stock?`
  );
}

export function orderWhatsappLink(orderNumber: string) {
  return whatsappLink(`Hi, I'd like an update on my order ${orderNumber}.`);
}

type OrderDetailsInput = {
  orderNumber: string;
  name: string;
  phone: string;
  address: string;
  items: { name: string; price: number; quantity: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

// Builds a wa.me link to the STORE's WhatsApp number containing the full
// order recap - customer info + itemized basket - since all sales now go
// through WhatsApp instead of M-Pesa STK push.
export function orderDetailsWhatsappLink({
  orderNumber,
  name,
  phone,
  address,
  items,
  subtotal,
  deliveryFee,
  total,
}: OrderDetailsInput) {
  const itemLines = items
    .map((i, idx) => `${idx + 1}. ${i.name} x${i.quantity} - ${formatKES(i.price * i.quantity)}`)
    .join("\n");

  const message = [
    "*New Order - Chaaz Builders*",
    `Order #: ${orderNumber}`,
    "",
    `Customer: ${name}`,
    `Phone: ${phone}`,
    `Delivery Address: ${address}`,
    "",
    "Items:",
    itemLines,
    "",
    `Subtotal: ${formatKES(subtotal)}`,
    `Delivery: ${formatKES(deliveryFee)}`,
    `Total: ${formatKES(total)}`,
    "",
    "Please confirm how to complete payment for this order.",
  ].join("\n");

  return whatsappLink(message);
}
