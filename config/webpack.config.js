/*
 * @Author: zoucong 
 * @Date: 2017-06-28 13:47:26 
 * @Last Modified by: zoucong
 * @Last Modified time: 2017-06-28 16:33:53
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = function (env) {
  const root = path.resolve(__dirname, '../');
  const srcPath = path.resolve(root, 'src/');
  const distPath = env.production ? path.resolve(root, 'build/') :
    path.resolve(root, 'dist/');// 'build' for release commit
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: env.production// Uglify CSS
    }
  };

  return {
    entry: './src/index.js',
    output: {
      filename: '[name]_[hash:7].js',
      path: distPath,
    },
    plugins: [
      new CleanWebpackPlugin(['*'], { root: distPath }),
      new ExtractTextPlugin("[name]_[hash:7].css"),
      new HtmlWebpackPlugin({
        template: path.resolve(srcPath, 'templates/index.ejs'),
      }),
      env.production ? new UglifyJSPlugin() : null,// Uglify JS
    ]
      .filter(d => d),// filter null
    module: {
      rules: [
        // jshint
        {
          test: /\.jsx?$/,
          enforce: "pre",
          exclude: /node_modules/,
          use: ['eslint-loader']
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['transform-runtime']
            }
          },
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: cssLoader
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [cssLoader, 'sass-loader']
          }),
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ]
    }
  };
}
