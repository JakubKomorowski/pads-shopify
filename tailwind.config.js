/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f0f0f0',
        main: '#FF5F49',
        dark: '#ff3216',
        grey: '#bfbfbf',
      },
      fontFamily: {
        mukta: 'Mukta',
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(350px, 390px))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss')({prefix: 'ui'}),
    require('daisyui'),
  ],
};
