import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./contexts/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#1246C7",
          dark: "#071A3D",
          light: "#4C7DF0",
        },
        accent: {
          DEFAULT: "#1FA84A",
          dark: "#0E7A34",
          light: "#4FD37A",
        },
        surface: "#F7F9FC",
      },
      borderRadius: {
        xl2: "20px",
        xl3: "28px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(7, 26, 61, 0.08)",
        glow: "0 0 40px rgba(18, 70, 199, 0.25)",
        "glow-green": "0 0 40px rgba(31, 168, 74, 0.25)",
        card: "0 20px 60px -15px rgba(7, 26, 61, 0.15)",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(135deg, #1246C7 0%, #4C7DF0 100%)",
        "green-gradient": "linear-gradient(135deg, #1FA84A 0%, #4FD37A 100%)",
        "brand-gradient": "linear-gradient(135deg, #1246C7 0%, #1FA84A 100%)",
        "navy-gradient": "linear-gradient(180deg, #071A3D 0%, #0B2455 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
