// importing plugins that do not come by default in webpack
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Simple icon font handling for webpack.
import IconfontWebpackPlugin from 'iconfont-webpack-plugin';

// Webpack is a module bundler. Its main purpose is to bundle JavaScript
// files for usage in a browser, yet it is also capable of transforming,
// bundling, or packaging just about any resource or asset.
import webpack from 'webpack';

// The NodeJS ’path’ module.
import path from 'path';

import common from './webpack.common.config.js';

export default {
  ...common,

  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      // Webpack plugin for Babel
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // css loader module for webpack.
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
              importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  // Add the plugin
                  new IconfontWebpackPlugin({
                    resolve: loader.resolve,
                    modules: false,
                  }),
                ],
                config: {
                  path: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ]
        })
      },
      // Image loader module for webpack.
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        loaders: [
          'file-loader',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
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
