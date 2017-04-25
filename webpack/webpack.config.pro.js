const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('config');
const webpackConfig = require('./webpack.config');
const { appPath, appHtml, favicon, stylesPath } = require('./paths');

module.exports = Object.assign({}, webpackConfig, {
  devtool: 'source-map',
  entry: [
    appPath
  ],
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      favicon,
      inject: true,
      template: appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourceMap: true
    }),
    new ExtractTextPlugin(stylesPath),
    new webpack.EnvironmentPlugin({ NODE_ENV: config.NODE_ENV }),
    new webpack.DefinePlugin({
      APP_CONFIG: JSON.stringify(config)
    }),
    new ProgressBarPlugin()
  ],
  performance: {
    hints: 'warning'
  }
});
