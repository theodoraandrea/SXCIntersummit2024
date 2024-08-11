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
      colors: {
        'primary-1': '#003337',
        'primary-2': '#01AFBA',
        'primary-3': '#D5A141',
        'primary-4': '#004349',
        'primary-5': '#E2E8EA',
        'secondary-2': '#007e87'
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
        '.bg-gradient-primary': {
          background: 'linear-gradient(90deg, #01AFBA 0%, #004349 100%)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
