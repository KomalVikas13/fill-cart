/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme': "#f83734"
      },
      fontFamily: {
        'verdana': 'Verdana, Geneva, Tahoma, sans-serif'
      }
    },
  },
  plugins: [],
}