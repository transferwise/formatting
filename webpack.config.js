module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "formatting.js",
    library: "@transferwise/formatting",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
