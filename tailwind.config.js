/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '50%',
          md: '75%',
          lg: '800px',
          xl: '800px',
        },
      },
    },
  },
  plugins: [],
}