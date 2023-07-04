module.exports = {
  mode: 'jit',
  // content: ['./src/**/*.html', './src/**/*.tsx', './public/**/*.html', "./node_modules/tw-elements/dist/js/**/*.js"],
  purge: ['./src/**/*.html', './src/**/*.tsx', './public/**/*.html', "./node_modules/tw-elements/dist/js/**/*.js"],
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
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
