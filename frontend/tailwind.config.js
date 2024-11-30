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
      scrollBehavior: {
        smooth: 'smooth',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        lato: ['Lato', 'sans-serif']
      },
      colors: {
        'primary-1': '#003337',
        'primary-2': '#01AFBA',
        'primary-3': '#D5A141',
        'primary-4': '#004349',
        'primary-5': '#E2E8EA',
        'primary-6': '#FDEAC7',

        'secondary-1': '#004d40',
        'secondary-2': '#007e87',
        'secondary-4': '#006B6B',

      },
      width: {
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '500': '500px',
        '600': '600px',
        '800': '800px',
        '900': '900px',
        '1000': '1000px',
      },
      height: {
        '200': '200px',
        '300': '300px',
        '500': '500px',
        '800': '800px',
      },
      boxShadow: {
        'xl': '0 15px 20px -5px rgba(0, 51, 55, 255)',
        '3xl': '0 35px 60px -15px rgba(0, 51, 55, 255)',
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
        '.text-gradient-green': {
          background: 'linear-gradient(160deg, #003337, #33666A, #ffffff)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-gradient-primary': {
          background: 'linear-gradient(90deg, #01AFBA 0%, #004349 100%)',
        },
        '.bg-gradient-primary-2': {
          background: 'linear-gradient(90deg, #01AFBA 0%, #007373 100%)',
        },
        '.bg-gradient-primary-3': {
          background: 'linear-gradient(180deg, #01AFBA 0%, #00A0B0 100%)',
        },
        '.bg-gradient-secondary': {
          background: 'linear-gradient(45deg, #8f6B29, #DF9F28)',
        },
        '.bg-gradient-secondary-2': {
          background: 'linear-gradient(180deg, #DF9F28, #8f6B29)',
        },
        '.bg-gradient-gray': {
          background: 'linear-gradient(90deg, #808080 0%, #6c6c6c 100%)'
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
    require('daisyui'),
  ],
};
