/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'pblue': '#1338BB',
        'plightblue': '#2584F4',
        'pdarkblue': '#020583',
        'pgrey': '#A3A3A3',
        'pgreen': '#4DD263',
        'plightgreen': '#6CD37D',
        'verdeclaro': '#71DD28',
      },
      boxShadow: {
        'bottom-lg': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'daysone': ['Days One', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      screens: {
        'md': '1350px', // Modifica este valor a lo que necesites
      },
    },
  },
  plugins: [],
}
