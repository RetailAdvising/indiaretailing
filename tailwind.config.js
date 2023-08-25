/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      boxShadow:{
        '2xl': '0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19)'
      },
      flex:{
        '75': '0 0 calc(75% - 20px)'
      },
      screens: {
        'sm': { 'max': '368px' },
        'md': { 'max': '768px' },
        'lg': { 'min': '768px' },
        'xl': { 'min': '1024px' },
        '2xl': { 'min': '1200px' }
      },
      colors:{
        'red': '#e21b22',
        'gray': '#818181',
        'dark':'111111',
        'text-red': '#e21b22' ,
        'light-gray': '#ddd',
        'border_color':'#EEEEEE',
        "gray-light": "#efefef"
      }
      
      
    },
  },
  plugins: [
    
  ],
}
