const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ProgressBarPlugin = require('webpackbar')
// 服务器端render,可以根据当前的manifest，引入css和js文件
const ManifestPlugin = require('webpack-manifest-plugin')

const { ReactLoadablePlugin } = require('react-loadable/webpack')

const rootPath = path.join(__dirname, '../')

const prefixName =
  process.env.NODE_ENV == 'production'
    ? '[name].nodeJsp.[contenthash:8]'
    : '[name]'

module.exports = {
  entry: {
    assets: ['./src/index.js']
  },
  output: {
    filename: `${prefixName}.js`,
    path: path.resolve(rootPath, './build'),
    publicPath: '/',
    chunkFilename: `${prefixName}.js`
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory'
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'img/[sha512:hash:base64:7].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({ summary: false }),

    new MiniCssExtractPlugin({
      filename: `${prefixName}.css`,
      chunkFilename: `${prefixName}.css`,
      ignoreOrder: false
    }),

    new ManifestPlugin({
      // 在热更新也需要打包到build
      writeToFileEmit: true
    }),

    // 需要Webpack告诉我们每个模块位于哪个捆绑包
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'css', 'less', 'png', 'jpg'], // 用于webpack查找文件时自行补全文件后缀
    alias: {
      '@src': path.resolve(__dirname, '../src')
    }
  },
  optimization: {
    minimizer: [],

    // 代码分割处理
    splitChunks: {
      cacheGroups: {
        // 把node——modules打包到公共文件vendor下
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  }
}