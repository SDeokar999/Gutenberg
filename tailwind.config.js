/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
      },
      backgroundColor:{
        'custom-light-purple': '#F8F7FF', // custom color name
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontSizePre: {
        '20px': '20px',
        'medium': '48px',
      },
      fontWeight: {
        'regular': '400',
        'semibold': '600',
      },
      backgroundImage:{
        'Pattern':"url('./assets/Pattern.svg')",
      },
    },
  },
  plugins: [],
}

