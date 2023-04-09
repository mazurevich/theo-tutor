const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
const config = {
  mode: process.env.NODE_ENV ? "jit" : undefined,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.zinc[950],
          active: colors.zinc[800],
          hover: colors.zinc[900],
        },
        secondary: {
          DEFAULT: colors.slate[100],
          active: colors.slate[300],
          hover: colors.slate[200],
        }
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};

module.exports = config;
