const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${NUMBER}?text=${encoded}`;
}

export function productWhatsappLink(productName: string, price: number) {
  return whatsappLink(
    `Hi Chaaz Builders, I'm interested in "${productName}" (KES ${price.toLocaleString()}). Is it in stock?`
  );
}

export function orderWhatsappLink(orderNumber: string) {
  return whatsappLink(`Hi, I'd like an update on my order ${orderNumber}.`);
}
