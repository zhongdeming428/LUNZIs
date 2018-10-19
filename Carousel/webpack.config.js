const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './test/Carousel.test.js'),
  output: {
    filename: 'Carousel.test.min.js',
    path: path.resolve(__dirname, './test/')
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