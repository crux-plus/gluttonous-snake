import HtmlWebpackPlugin from 'html-webpack-plugin';

import common from './webpack.common.config.js';

import path from 'path';

export default {
  ...common,

  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  devtool: "source-map", // enum

  devServer: {
    // proxy URLs to backend development server
    proxy: {
      '/api': 'http://localhost:3000'
    },
    // boolean | string | array, static file location
    contentBase: path.join(__dirname, 'assets'),
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

  // adding plugins to your configuration
  plugins: [
    // This is a webpack plugin that simplifies creation of
    // HTML files to serve your webpack bundles.
    new HtmlWebpackPlugin({
      filename: 'assets/index.html'
    })
  ],
};
