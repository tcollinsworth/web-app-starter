const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const fs = require('fs')

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/main/main.js'
  },
  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'AppLibrary'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: { }
          // options: {
          //     limit: 8000, // Convert images < 8kb to base64 strings
          //     name(file) {
          //       // if (process.env.NODE_ENV === 'development') {
          //       //   return '[path][hash]-[name].[ext]';
          //       // }
          //       console.log('**********', file)
          //
          //       return '[path][name].[ext]?[hash]';
          //     },
          //   }
          }]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: 'src/main/main.html',
      filename: 'main/main.html',
      favicon: "src/favicon1.ico",
      chunks: ['main']
    })
  ],
  watch: true,
  watchOptions: {
    ignored: ['node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: 'app-localhost.com',
    port: 9000,
    index: 'main/main.html'
  }
}
