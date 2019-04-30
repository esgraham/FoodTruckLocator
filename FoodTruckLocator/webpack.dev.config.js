const path = require('path');
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  devtool: 'source-map',

    devServer: {
         contentBase: './dist', // Content base
         inline: true, // Enable watch and live reload
         host: 'localhost',
         port: 8082,
         stats: 'errors-only'
    },

  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },


plugins: [
     new Dotenv(),
     new CopyPlugin([
      { from: path.resolve(__dirname, 'images'), to: path.resolve(__dirname, 'dist/images') },
      { from: path.resolve(__dirname, 'css'), to: path.resolve(__dirname, 'dist/css') }
    ]),     
  ]
};