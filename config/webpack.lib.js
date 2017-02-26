/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

const helpers = require('./helpers');
const webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

function ngExternal(ns) {
    const ng2Ns = `@angular/${ns}`;
    return { root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns };
}

module.exports = {
    devtool: 'source-map',

    resolve: {
      extensions: ['.ts', '.js']
    },

    entry: helpers.root('./index.ts'),

    output: {
      path: helpers.root('bundles'),
      publicPath: '/',
      filename: 'angular2-cookie-law.umd.js',
      libraryTarget: 'umd',
      library: 'angular2-cookie-law'
    },

    // require those dependencies but don't bundle them
    externals: {
      '@angular/core': ngExternal('core'),
      '@angular/common': ngExternal('common'),
    },

    module: {
      rules: [

        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                declaration: false
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.e2e\.ts$/]
        },

        {
          test: /\.(css|html)?$/,
          use: [
            {
              loader: 'raw-loader'
            },
          ]
        },

      ]
    },

    plugins: [
      // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src')
      ),

      new LoaderOptionsPlugin({
        options: {
          tslintLoader: {
            emitErrors: false,
            failOnHint: false
          }
        }
      })
    ]
};
