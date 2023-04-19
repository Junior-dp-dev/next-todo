/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Segoe UI", "Helvetica", "Arial", "sans-serif"],
      caveat: ["Caveat", "cursive"],
      handlee: ["Handlee", "cursive"],
      kalam: ["Kalam", "cursive"],
    },
    minHeight: {
      p50: "50px",
      p55: "55px",
      p60: "60px",
      vh80: "80vh",
      vh85: "85vh",
      vh90: "90vh",
    },
    minWidth: {
      600: "37.5rem",
    },
  },
  plugins: [],
};
