import type { Metadata } from "next";
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
  title: "Chaaz Builders | Premium Building Materials & Plumbing Supplies",
  description,
  openGraph: {
    type: "website",
    siteName: "Chaaz Builders",
    title: "Chaaz Builders | Building Materials & Plumbing Supplies",
    description,
    url: "/",
    locale: "en_KE",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Chaaz Builders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaaz Builders | Building Materials & Plumbing Supplies",
    description,
    images: ["/og-image.jpg"],
  },
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
