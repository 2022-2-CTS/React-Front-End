/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    backgroundImage: {
      wave: "url('./img/icon/wave.svg')",
    },
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
};