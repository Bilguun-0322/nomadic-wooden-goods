/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FAF7F2",       // Warm linen / off-white natural background
          card: "#FFFFFF",     // Clean card background
          dark: "#1E1611",     // Deep solid charcoal wood text
          muted: "#6B5E55",    // Secondary / subtext muted wood tone
          gold: "#C79A4B",     // Traditional brass / gold accent
          goldHover: "#B3873C",
          red: "#8F3324",      // Traditional lacquer red accent
          redHover: "#7A2B1E",
          border: "#E6DED4",   // Subtle wood-fiber border
          borderLight: "#F0EAE1",
          woodDark: "#2C1E16",
        },
      },
      fontFamily: {
        serif: ["'PT Serif'", "Georgia", "serif"],
        sans: [
          "Manrope",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(30, 22, 17, 0.06)",
        warmHover: "0 10px 30px -4px rgba(30, 22, 17, 0.12)",
      },
    },
  },
  plugins: [],
};
