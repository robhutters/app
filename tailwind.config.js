module.exports = {
  mode: 'jit',
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
  content: ['./src/**/*.html', './src/**/*.tsx', './public/**/*.html', "./node_modules/tw-elements/dist/js/**/*.js"],
  purge: [
    "./src/**/*.{js,jsx}",
    "./public/index.html",
  ],
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
  plugins: [require('daisyui'), require("tw-elements/dist/plugin.cjs")],
};
