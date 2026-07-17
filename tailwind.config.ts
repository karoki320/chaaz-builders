import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./contexts/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Chaaz Builders brand: green wordmark, blue faucet/water accent
        brand: {
          DEFAULT: "#1B7A3D",
          dark: "#14532D",
          light: "#4ADE80",
        },
        accent: {
          DEFAULT: "#1E4E8C",
          dark: "#123164",
          light: "#3B82F6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
