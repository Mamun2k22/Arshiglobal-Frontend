/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ✅ custom animation here
      animation: {
        "spin-slow": "spin 14s linear infinite",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        arneFreytag: ["Arne Freytag", "sans-serif"],
        omens: ["Omens", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },

      // ✅ if you want custom brand colors, keep them SOLID (not gradient)
      colors: {
        primary: {
          DEFAULT: "#7E15FC",
        },
        secondary: {
          DEFAULT: "#1D4ED8",
        },
      },
    },

    // (optional) screens default রাখলেও হয়; তোমার custom লাগলে রাখো
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      // Custom aliases (optional)
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [require("tailgrids/plugin")],
};
