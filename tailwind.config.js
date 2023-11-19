/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077B5',           // Deep Blue
        secondary: '#00A8E8',         // Light Blue
        accent: {
          1: '#00CC66',               // Vibrant Green
          2: '#FF3366',               // Crimson Red
        },
        neutral: {
          1: '#FFFFFF',               // White
          2: '#333333',               // Charcoal Gray
          3: '#CCCCCC',               // Light Gray
        },
        highlight: '#FFD700',         // Gold/Yellow
        background: '#F5F5F5',       // Light Gray
        error: '#FF0000',             // Red
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        stone: colors.stone,
        sky: colors.sky,
        neutral: colors.neutral,
        gray: colors.gray,
        slate: colors.slate,
        orange: colors.orange,
        pink: colors.pink,
        purple: colors.purple,
        teal: colors.teal,
      },
    },
  },
  plugins: [],
}

