module.exports = {
  parser: 'sugarss',
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-modules')({
      // can be 'global' or 'local'
      scopeBehaviour: 'local',
      generateScopedName: '[path][name]__[local]--[hash:base64:5]',
    }),
  ],
};
