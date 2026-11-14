// Shop details shown in the trust section, footer and product pages.
// Leave a field as null to hide it on the site; fill it in when confirmed.
export const BUSINESS = {
  name: "Chaaz Builders",
  siteUrl: "https://www.chaazbuilders.com",
  phoneDisplay: "+254 741 164235",
  phoneTel: "+254741164235",
  whatsapp: "254741164235", // digits only, for wa.me links
  deliveryArea: "Nairobi and its environs",
  deliveryNote: "Same-day dispatch on in-stock orders within Nairobi and its environs.",
  paymentNote: "Order on WhatsApp - our team confirms stock, delivery and payment with you directly.",
  // TODO: fill in after confirming with the client
  address: "Sheikh Karume Road, Nairobi CBD" as string | null,
  mapUrl: "https://maps.app.goo.gl/ysSMYcjTifaZeDTV7" as string | null,
  geo: { lat: -1.2847156, lng: 36.8281444 },
  hours: null as string | null, // e.g. "Mon-Sat 8:00am - 6:00pm"
};
