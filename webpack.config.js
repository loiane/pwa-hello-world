const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env;

const DIST_DIR = 'dist';

let plugins = [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }
    ]),
    new WorkboxPlugin({
      globDirectory: DIST_DIR,
      globPatterns: ['**/*.{html,js,css,json,png}'],
      swDest: path.join(DIST_DIR, 'sw.js')
    })
  ],
  outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'app.min.js';
} else {
  outputFile = 'app.js';
}

const config = {
  entry: __dirname + '/src/js/app.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader?presets[]=env',
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./js')],
    extensions: ['.js']
  },
  plugins: plugins
};

module.exports = config;
