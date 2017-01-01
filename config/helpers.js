/**
 * angular2-cookie-law
 *
 * Copyright 2016, @andreasonny83, All rights reserved.
 *
 * Author: @andreasonny83 <andreasonny83@gmail.com>
 */

var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
