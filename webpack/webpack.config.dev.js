const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('config');
const webpackConfig = require('./webpack.config');
const { appPath, distPath, publicPath, appHtml, favicon, stylesPath } = require('./paths');

const { port } = config.devServer;

module.exports = Object.assign({}, webpackConfig, {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?/',
    'webpack/hot/only-dev-server',
    appPath
  ],
  devServer: {
    hot: true,
    contentBase: distPath,
    compress: true,
    port,
    stats: 'errors-only',
    publicPath,
    overlay: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: config.title,
      favicon,
      inject: true,
      template: appHtml
    }),
    new ExtractTextPlugin(stylesPath),
    new webpack.EnvironmentPlugin({ NODE_ENV: config.NODE_ENV }),
    new webpack.DefinePlugin({
      APP_CONFIG: JSON.stringify(config)
    })
  ],
  performance: {
    hints: false
  }
});
