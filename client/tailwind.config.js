/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        shojumaru: ['Shojumaru', 'cursive'],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

