import webpack from 'webpack';

// importing plugins that do not come by default in webpack
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import common from './webpack.common.config.js';

export default {
  ...common,

  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
    ],
  },

   // adding plugins to your configuration
  plugins: [
    // build optimization plugins
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new ExtractTextPlugin({
      filename: 'build.min.css',
      allChunks: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // compile time plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
