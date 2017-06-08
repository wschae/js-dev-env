import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  // entry: [
  //   path.resolve(__dirname, 'src/index')
  // ],
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // filename: 'bundle.js'
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Generte an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),

    // Create HTML file that includes references to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      // {test: /\.css$/, loaders: ['style','css']}
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
