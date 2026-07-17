import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./contexts/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#c2410c",
          dark: "#9a3412",
          light: "#fb923c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
