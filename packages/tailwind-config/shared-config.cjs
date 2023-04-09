// /** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const theme = {
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
      },
    },
  },
};

module.exports = {
  theme,
};
