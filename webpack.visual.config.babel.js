// This is a webpack plugin that simplifies creation of
// HTML files to serve your webpack bundles.
import HtmlWebpackPlugin from 'html-webpack-plugin';

// webpack is a module bundler. Its main purpose is to bundle JavaScript
// files for usage in a browser, yet it is also capable of transforming,
// bundling, or packaging just about any resource or asset.
import webpack from 'webpack';

// The NodeJS ’path’ module.
import path from 'path';

import common from './webpack.common.config.js';

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
    contentBase: path.join(__dirname, 'content', 'client'),
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
    //When open is enabled, the dev server will open the browser.
    open: true,
    // ...
  },

  // adding plugins to your configuration
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/client/index.html',
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
