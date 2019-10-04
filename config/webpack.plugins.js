const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

dotenv.config();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  title: 'Tic Tac Toe'
});

const terserPlugin = new TerserPlugin({
  cache: true,
  parallel: true,
  sourceMap: true
});

const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({});

const cleanWebpackPlugin = new CleanWebpackPlugin();

const extractTextPlugin = new ExtractTextPlugin('bundle.min.css');

const definePlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(process.env)
});

module.exports = {
  htmlWebpackPlugin,
  terserPlugin,
  optimizeCSSAssetsPlugin,
  cleanWebpackPlugin,
  extractTextPlugin,
  ExtractTextPlugin,
  definePlugin,
  FaviconsWebpackPlugin
};
