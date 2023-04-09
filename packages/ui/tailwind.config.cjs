const theme = require("tailwind-config").theme;

/** @type {import('tailwindcss').Config} */
const config = {
  mode: process.env.NODE_ENV ? "jit" : undefined,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme,
  plugins: [require("@headlessui/tailwindcss")],
};

module.exports = config;
