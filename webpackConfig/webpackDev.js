const path = require('path');
const merge = require('webpack-merge');
const appCommonConfig = require('./webpackCommon.js');

module.exports = merge.merge( appCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9001
  }
});