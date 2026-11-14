import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, WhatsApp or message Chaaz Builders about plumbing and building materials in Nairobi and its environs.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
