const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './Carousel.test.js'),
  output: {
    filename: 'Carousel.test.min.js',
    path: __dirname
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};