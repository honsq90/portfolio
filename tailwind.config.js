/** @type {import('tailwindcss').Config} */

var defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Cabin', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
