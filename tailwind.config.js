/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'custom_white': 'FEFAE0',
      'custom_yellow1': '#EAE2B7',
      'custom_yellow2': '#FCBF49',
      'custom_orange': '#F77F00',
      'custom_red': '#D72828',
      'custom_blue': '#003049',
    },
    extend: {},
  },
  plugins: [],
}