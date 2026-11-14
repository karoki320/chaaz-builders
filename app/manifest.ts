import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chaaz Builders",
    short_name: "Chaaz",
    description: "Building materials and plumbing supplies, delivered across Nairobi and its environs.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F9FC",
    theme_color: "#071A3D",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
