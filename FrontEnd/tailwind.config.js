/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Google Sans', 'sans-serif'],
      },
      colors: {
        'primary': {
          light: '#4285F4', // Google Blue
          dark: '#1a73e8',
        },
        'secondary': {
          light: '#34A853', // Google Green
          dark: '#188038',
        },
        'accent': {
          light: '#FBBC05', // Google Yellow
          dark: '#F29900',
        },
        'error': {
          light: '#EA4335', // Google Red
          dark: '#D93025',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}