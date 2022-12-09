const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,html,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Source Sans Pro'", ...defaultTheme.fontFamily.sans],
        serif: ["'Source Serif Pro'", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
