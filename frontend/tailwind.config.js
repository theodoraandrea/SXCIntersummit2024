// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-1' : '#003337',
        'primary-2' : '#01AFBA',
        'primary-3' : '#D5A141',
        'primary-4' : '#004349',
      },
      width: {
        '300' : '300px',
        '350' : '350px',
        '400' : '400px',
        '500' : '500px',
        '600' : '600px',
        '800' : '800px',
        },
        height: {
        '200' : '200px',
        '300' : '300px',
        '500' : '500px',
        '800' : '800px',
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          background: 'linear-gradient(90deg, #ffffff, #D5A141)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
}