/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        shojumaru: ['Shojumaru', 'cursive'],
      },
      height: {
        '128': "28rem",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

