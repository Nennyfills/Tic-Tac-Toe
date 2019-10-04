const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal'
  }
});
