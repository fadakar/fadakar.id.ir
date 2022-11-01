/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'},
      }
    },
  },
  plugins: [],
}
