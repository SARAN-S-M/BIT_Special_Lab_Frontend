const { faDisplay } = require('@fortawesome/free-solid-svg-icons');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "custom-blue" : "0EA5E9",
        "dark-blue-bg" : "0F172A"
      },
    },
  },
  plugins: [],
  variants: {
    extend : {
      faDisplay: ["focus-group"]
    }
  }
}

