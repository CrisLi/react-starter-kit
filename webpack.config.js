const config = require('config');

if (config.NODE_ENV === 'production') {
  module.exports = require('./webpack/webpack.config.pro');  // eslint-disable-line
} else {
  module.exports = require('./webpack/webpack.config.dev');  // eslint-disable-line
}
