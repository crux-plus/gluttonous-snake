// The NodeJS ’path’ module.
import path from 'path';

// webpack is a module bundler. Its main purpose is to bundle JavaScript
// files for usage in a browser, yet it is also capable of transforming,
// bundling, or packaging just about any resource or asset.
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
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
           {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              // Lossy PNG compressor — pngquant command and libimagequant library.
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              // Improved JPEG encoder.
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          },
        ]
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
