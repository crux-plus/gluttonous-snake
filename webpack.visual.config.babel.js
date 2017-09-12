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
    contentBase: path.join(__dirname, 'content'),
    // enable gzip compression
    compress: true,
    // true for index.html upon 404, object for multiple paths
    //historyApiFallback: true,
    // hot module replacement. Depends on HotModuleReplacementPlugin
    hot: true,
    // true for self-signed, object for cert authority
    https: false,
    // only errors & warns on hot reload
    noInfo: true,
    // ...
  },

  // adding plugins to your configuration
  plugins: [
    // This is a webpack plugin that simplifies creation of
    // HTML files to serve your webpack bundles.
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
    }),
  ],
};
