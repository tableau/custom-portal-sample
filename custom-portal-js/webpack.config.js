var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'view-workbook': ['./src/viewWorkbook.js'],
    'selfserviceanalytics': ['./src/selfserviceanalytics.js'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jshint-loader'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-object-rest-spread']
      }
    }, {
      test: /static/,
      loader: 'file'
    }, {
      test: /pages/,
      loader: 'file'
    }]
  },
  resolve: {
    extensions: ['', '.js'],
    moduleDirectories: ['node_modules']
  },
  jshint: {
    browser: true,
    indent: 2,
    devel: true,
    maxlen: 120,
    esversion: 6
  },
  devServer: {
    inline: true
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static' }
    ]),
    new CopyWebpackPlugin([
      { from: 'pages' }
    ]),
    new CopyWebpackPlugin([
      { from: 'scl-alpha.js' }
    ])
  ]
};
