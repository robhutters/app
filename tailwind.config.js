module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.js', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        highlight: '#ffcb47',
        layer1: '#8EA0B8',
        layer2: '#593d3b',
        layer3: '#917A6E',
        dark: {
          400: '#0D0E12',
        },
      },
      fontFamily: {
        header: ['abolition'],
        body: ['Proxima Nova'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
