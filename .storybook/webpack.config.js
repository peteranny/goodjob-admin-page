'use strict';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('../config/webpack.config.dev');

module.exports = {
  module: baseConfig.module,
};
