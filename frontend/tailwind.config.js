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
        fashionBg: "#0a0a0a",
        fashionBeige: "#1a1a1a",
        fashionInk: "#000000",
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
          bg: "#0f0f0f",
          surface: "#1a1a1a",
          surface_hover: "#242424",
          glass: "rgba(255, 255, 255, 0.05)",
          glass_hover: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(135deg, rgba(141, 92, 255, 0.1) 0%, rgba(255, 79, 163, 0.1) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
      backdropFilter: {
        glass: "blur(10px)",
      },
    },
  },
  plugins: [],
};
