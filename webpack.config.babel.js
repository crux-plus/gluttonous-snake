import common from './webpack.common.config.babel.js';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  ...common,
  module: {
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
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
};
