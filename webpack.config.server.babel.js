// The NodeJS ’path’ module.
import path from 'path';

// Simple icon font handling for webpack.
import IconfontWebpackPlugin from 'iconfont-webpack-plugin';

// Extract text from a bundle, or bundles, into a separate file.
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Webpack is a module bundler. Its main purpose is to bundle JavaScript
// files for usage in a browser, yet it is also capable of transforming,
// bundling, or packaging just about any resource or asset.
import webpack from 'webpack';

export default {
  // Here the application starts executing
  // and webpack starts bundling
  entry: {
    entry: './src/client/entry.jsx',
    polyfills: './src/client/polyfills.js',
  },

  // options related to how webpack emits results
  output: {
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    path: path.resolve(__dirname, 'dist'), // string

    // This option determines the name of non-entry chunk files.
    chunkFilename: '[name].bundle.js',

    // the filename template for entry chunks
    filename: '[name]@[hash].js', // for multiple entry points
  },

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
      // bundle loader for webpack
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
      },
      // Image loader module for webpack.
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },

  // options for resolving module requests
  // (does not apply to resolving to loaders)
  resolve: {
    // directories where to look for modules
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],

    // extensions that are used
    extensions: ['.js', '.json', '.jsx', '.css'],

    // a list of module name aliases
    alias: {
      'client': 'client',
      'isomerism': 'isomerism',
    },
    /* alternative alias syntax (click to show) */

    /* Advanced resolve configuration (click to show) */
  },

  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: 'web', // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  //
  plugins: [
    new ExtractTextPlugin({
      filename: 'build.min.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
