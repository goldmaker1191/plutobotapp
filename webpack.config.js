module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'sass-loader',
        options: {
                    includePaths: ["./src/scss"]
                }
      }
    ]
  }
};