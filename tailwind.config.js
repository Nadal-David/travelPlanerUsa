/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        asphalt: '#18212f',
        canyon: '#be4f2d',
        pacific: '#1c7c89',
        sun: '#f4b860',
        paper: '#f8f5ef'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(24, 33, 47, 0.14)'
      }
    }
  },
  plugins: []
};
