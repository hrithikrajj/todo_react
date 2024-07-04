/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xl: "40px",
      },
    },
    colors: {
      background: "#181717",
      white: "#ffffff",
      black: "#000000",
      secondary: "#2e2e2e",
    },
  },
  plugins: [
    require("tailwindcss-gradients"),
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, Opera */,
        },
      });
    },
  ],
};
