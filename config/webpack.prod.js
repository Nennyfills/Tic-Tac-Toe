const merge = require('webpack-merge');

const { cleanWebpackPlugin, terserPlugin, optimizeCSSAssetsPlugin } = require('./webpack.plugins.js');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].min.js'
  },
  optimization: {
    minimizer: [
      terserPlugin,
      optimizeCSSAssetsPlugin
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    cleanWebpackPlugin
  ],
});
