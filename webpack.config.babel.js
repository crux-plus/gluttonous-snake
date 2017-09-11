import ExtractTextPlugin from 'extract-text-webpack-plugin';

import common from './webpack.common.config.babel.js';

export default {
  ...common,

  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      }
    ]
  },

  // list of additional plugins
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
};
