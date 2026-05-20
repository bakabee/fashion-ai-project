/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fashionPink: "#ff4fa3",
        fashionBg: "#f8f8f8",
        fashionBeige: "#f5f0eb",
        fashionInk: "#1a1a1a",
        fashionPurple: "#8d5cff",
        dark: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        luxury: {
          bg: "#fafaf9",
          surface: "#f5f5f4",
          surface_hover: "#efefed",
          glass: "rgba(255, 255, 255, 0.7)",
          glass_hover: "rgba(255, 255, 255, 0.85)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.01) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)",
      },
      backdropFilter: {
        glass: "blur(10px)",
      },
    },
  },
  plugins: [],
};
