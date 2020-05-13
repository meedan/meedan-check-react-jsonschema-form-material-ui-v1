/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const babelExclude = /node_modules/;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractScss = new ExtractTextPlugin({ filename: "style.css", allChunks: true })
const extractCss = new ExtractTextPlugin({ filename: "main.css", allChunks: true })

const DEVELOPMENT = process.env.node_env !== 'production';

module.exports = {
  entry: [
    ...(DEVELOPMENT ? [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
    ] : []),
    'babel-polyfill',
    path.join(__dirname, 'src/demo/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            use: [
              'babel-loader',
              // { loader: 'eslint-loader', options: { exclude: babelExclude } },
            ],
            exclude: babelExclude,
          },
          {
            test: /\.scss$/,
            use: extractScss.extract({
              use: [{
                loader: 'css-loader',
                options: {
                  localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                  modules: true,
                  camelCase: true,
                }
              }, {
                loader: 'sass-loader',
              }]
            }),
          },
          {
            test: /\.css$/,
            use: extractCss.extract({
              use: [{
                loader: 'css-loader',
              }]
            }),
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loaders: [
              {
                loader: 'url-loader',
                options: {
                  limit: 50000,
                },
              }, {
                loader: 'image-webpack-loader',
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /.s?css$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  plugins: [
    extractCss,
    extractScss,
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    new HtmlWebpackPlugin({
      template: 'src/demo/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    ...(DEVELOPMENT ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new webpack.optimize.UglifyJsPlugin(),
    ]),
  ],
  target: 'web',
  stats: 'normal',
}
