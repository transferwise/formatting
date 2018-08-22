module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'formatting.js',
    library: '@transferwise/formatting',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
