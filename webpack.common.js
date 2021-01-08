const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WriteFilePlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'robots.txt'),
          to: path.resolve(__dirname, 'dist', 'robots.txt')
        }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'customerArea',
      filename: 'customerArea.html',
      template: './src/customerArea.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'home-page',
      filename: 'index.html',
      template: './src/index.html',
      inject: 'head'
    }),
      new HtmlWebpackPlugin({
          title: 'look-book',
          filename: 'look-book.html',
          template: './src/look-book.html',
          inject: 'head'
      }),
    new HtmlWebpackPlugin({
      title: 'look-book-inner',
      filename: 'look-book-inner.html',
      template: './src/look-book-inner.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'finished-products',
      filename: 'finished-products.html',
      template: './src/finished-products.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'product-card',
      filename: 'product-card.html',
      template: './src/product-card.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'fancywork',
      filename: 'fancywork.html',
      template: './src/fancywork.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'accessory',
      filename: 'accessory.html',
      template: './src/accessory.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'about',
      filename: 'about.html',
      template: './src/about.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'cooperation',
      filename: 'cooperation.html',
      template: './src/cooperation.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: '404-page',
      filename: '404.html',
      template: './src/404.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'basket-page',
      filename: 'basket.html',
      template: './src/basket.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'basket-steps-page',
      filename: 'basket-steps.html',
      template: './src/basket-steps.html',
      inject: 'head'
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) {
          return 'font';
        }
      },
      fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
      include: 'allAssets'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ],
  externals: {
    $: 'jquery',
    jquery: 'jQuery',
    'window.$': 'jquery'
  }
};
