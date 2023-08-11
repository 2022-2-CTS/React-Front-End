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
      boxShadow: {
        'nav': '0px -10px 30px 3px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
};