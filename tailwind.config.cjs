/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f7f4ed',
          100: '#f0e7d6',
          200: '#e6ddc4',
          300: '#d4c6ad',
          400: '#a3b18a',
          500: '#7fa99b',
          600: '#5c6f82',
          700: '#2f5d62',
          800: '#274b4f',
          900: '#1f3b3e'
        },
        ink: {
          900: '#1f3b3e',
          700: '#2f5d62',
          500: '#5c6f82'
        }
      }
    }
  },
  plugins: []
};
