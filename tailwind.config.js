module.exports = {
  content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      },
      colors: {
        textDark: '#2C2D31',
        bg1Dark: '#1C1B1C',
        success: '#00AB66',
        warning: '#FFC107',
        error: '#FF0000',
        information: '#007BFF'
      }
    }
  },
  variants: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: [require('tailwind-scrollbar')]
};
