
module.exports = {
  plugins: [
    require('postcss-preset-env')(),
    require('postcss-responsive-type')(),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')
  ],
};