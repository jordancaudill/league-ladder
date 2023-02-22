/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,html,js,ts,tsx,jsx}"
  ],
  plugins: [],
  theme: {
    fontFamily: {
      sans: ['Lato', 'Poppins', 'Roboto', 'sans-serif']
    },
    colors: {
      'white': '#FFFFFF',
      'navy': '#1C2951',
      'navy-dark': '#121A34',
      'red': '#EC1010',
      'red-dark': '#A11010',
      'blue': '#4091FF',
      'blue-dark': '#2E66B2',
      'green': '#2EB90D',
      'green-dark': '#1E7809',
      'yellow': '#FFD500',
      'gray': '#ACACAC',
    }
  }
}