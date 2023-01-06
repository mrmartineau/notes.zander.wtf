/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,md,mdx,njk,twig,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: ['class', '[data-mode="dark"]'],
}
