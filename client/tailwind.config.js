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
      },
      colors: {
        'purple-main': '#6B46C1',
        'purple-secondary': '#EBE6F5',

      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    darkTheme: false, // Explicitly set darkTheme to false to disable dark mode
  },
}

