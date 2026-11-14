import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const description =
  "Plumbing, bathroom fittings, paint, tiles, steel and tools. Order on WhatsApp - delivered across Nairobi and its environs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chaazbuilders.com"),
  title: {
    default: "Chaaz Builders | Building Materials & Plumbing Supplies in Nairobi",
    template: "%s | Chaaz Builders",
  },
  description,
  applicationName: "Chaaz Builders",
  keywords: [
    "building materials Nairobi",
    "plumbing supplies Nairobi",
    "bathroom fittings Kenya",
    "sanitary ware Nairobi",
    "paint",
    "tiles",
    "steel",
    "hardware shop Nairobi",
    "Chaaz Builders",
  ],
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    siteName: "Chaaz Builders",
    title: "Chaaz Builders | Building Materials & Plumbing Supplies in Nairobi",
    description,
    url: "/",
    locale: "en_KE",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Chaaz Builders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaaz Builders | Building Materials & Plumbing Supplies in Nairobi",
    description,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#071A3D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <CartProvider>
          <WishlistProvider>
            {children}
            <FloatingWhatsApp />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
