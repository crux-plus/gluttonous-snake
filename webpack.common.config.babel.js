import path from 'path';

export default {
  // Here the application starts executing
  // and webpack starts bundling
  entry: './src/scripts/app/entry.js',

  // options related to how webpack emits results
  output: {
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    path: path.resolve(__dirname, "dist"), // string

    // the filename template for entry chunks
    filename: "[name].js", // for multiple entry points
  },

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
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { parser: 'sugarss', exec: true } },
        ]
      },
    ]
  },
};
