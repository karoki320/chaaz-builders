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

export const metadata: Metadata = {
  title: "Chaaz Builders | Premium Building Materials & Plumbing Supplies",
  description:
    "Quality plumbing and building solutions for every project - cement, steel, tiles, sinks, faucets, and more, delivered fast across Kenya.",
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
