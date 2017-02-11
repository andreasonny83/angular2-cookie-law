var typescript = require('rollup-plugin-typescript');
var sourcemaps = require('rollup-plugin-sourcemaps');
var pkg = require('./package.json');
var angular = require('rollup-plugin-angular');

var banner =
`/**
 * cookie-law.module v${pkg.version} (https://github.com/andreasonny83/angular2-cookie-law/)
 * Copyright 2017
 * Licensed under MIT
 */`;

module.exports = {
  entry: 'src/cookie-law.module.ts',
  format: 'umd',
  dest: 'lib/cookie-law.module.umd.js',
  sourceMap: true,
  moduleId: 'angular2-cookie-module',
  moduleName: 'angular2CookieLaw',

  banner: banner,

  external: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
  ],

  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
  },

  plugins: [

    angular(),

    typescript({
      typescript: require('typescript')
    }),

    sourcemaps(),

  ]
}
