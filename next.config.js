const withCSS = require("@zeit/next-css")
module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    url: false,
  },
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: [
          'style-loader', 'css',
        ],
      },
    ],
  },
})
