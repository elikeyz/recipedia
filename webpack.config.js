const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        },
        ],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/components'),
      static: path.resolve(__dirname, 'src/static'),
      store: path.resolve(__dirname, 'src/store'),
      actions: path.resolve(__dirname, 'src/store/actions'),
      constants: path.resolve(__dirname, 'src/store/constants'),
      reducers: path.resolve(__dirname, 'src/store/reducers'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: './',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'build/'),
    port: 3000,
    publicPath: 'http://localhost:3000/',
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: './src/static/images/recipedia logo.png',
    }),
  ],
  node: {
    fs: 'empty',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
