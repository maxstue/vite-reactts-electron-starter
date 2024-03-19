/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': 'rgb(var(--color-primary) / <alpha-value>)',
        'secondary-color': 'rgb(var(--color-secondary) / <alpha-value>)',
        'primary-bg': 'rgb(var(--bg-primary) / <alpha-value>)',
        'primary-button': 'rgb(var(--button-primary) / <alpha-value>)',
        'yellow-color': 'rgb(var(--color-yellow) / <alpha-value>)',
        'border-color': 'rgb(var(--color-border) / <alpha-value>)',
        offColor: '#767676'
      },
      fontFamily: {
        'SF-Display-Bold': 'SF Display Bold'
      },
      borderRadius: {
        10: '10px',
        14: '14px'
      },
      maxWidth: {
        1172: '1172px',
        1440: '1440px',
        920: '920px',
        640: '640px',
        460: '460px'
      },
      maxHeight: {
        '80vh': '80vh'
      }
    }
  },
  plugins: []
};
