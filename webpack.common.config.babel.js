export default {
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
};
