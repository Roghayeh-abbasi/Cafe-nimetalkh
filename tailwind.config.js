/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FFB300',
          dark: '#C78400',
          light: '#FFD95A',
        }
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
