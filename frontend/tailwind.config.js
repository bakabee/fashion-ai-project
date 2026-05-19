/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fashionPink: "#ff4fa3",
        fashionBg: "#fff7f0",
        fashionBeige: "#f3e5d8",
        fashionInk: "#201a1f",
        fashionPurple: "#8d5cff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
