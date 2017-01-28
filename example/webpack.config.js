var path = require('path');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    'main': './src/app.ts'
  },

  output: {
    path: root('dist'),
    filename: 'bundle.js',
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [root('src'), root('node_modules')],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
        ]
      },
      {
        test: /\.(html|css)$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/, root('src'), { }
    ),

    new LoaderOptionsPlugin({
      debug: true,
      options: {}
    }),

    new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
  ],

  devServer: {
    port: 9008,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};

function root(__path) {
  return path.join(__dirname, __path);
}
