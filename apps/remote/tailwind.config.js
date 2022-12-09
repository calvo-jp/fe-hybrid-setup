const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // TODO:
  // use glob here
  // ref: https://github.com/nrwl/nx/issues/8355
  content: ['apps/remote/src/**/*.{ts,tsx,html,svelte}'],
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
