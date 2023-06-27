module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.tsx', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
     
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
