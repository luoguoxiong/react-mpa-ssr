const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HappyPack = require("happypack");

const ProgressBarPlugin = require("webpackbar");

const ManifestPlugin = require("webpack-manifest-plugin");

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const { ReactLoadablePlugin } = require("nodejsplgx/webpack");

const rootPath = path.resolve(__dirname, "../");

const loadable = path.join(rootPath, "/build/loadable.json");

const manifest = path.join(rootPath, "/build/manifest.json");

const prefixName =
  process.env.NODE_ENV == "production" ? "[name].[contenthash:8]" : "[name]";

module.exports = {
  entry: {
    assets: ["./src/index.js"]
  },
  output: {
    filename: `Nsp_${prefixName}.js`,
    path: path.resolve(rootPath, "./build"),
    publicPath: "/",
    chunkFilename: `${prefixName}.js`
  },
  performance: {
    hints: false
  },
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: /src|lib/,
        use: "happypack/loader?id=js"
      },
      {
        test: /\.(css|less)$/,
        include: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          "happypack/loader?id=styles",
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            name: "img/[sha512:hash:base64:7].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({ summary: false }),

    new HappyPack({
      id: "js",
      threads: 5,
      loaders: ["babel-loader?cacheDirectory=true"]
    }),

    new HappyPack({
      id: "styles",
      threads: 3,
      loaders: ["css-loader", "less-loader"]
    }),

    new MiniCssExtractPlugin({
      filename: `${prefixName}.css`,
      chunkFilename: `${prefixName}.css`,
      ignoreOrder: false
    }),

    new ManifestPlugin({
      // 在热更新也需要打包到build
      writeToFileEmit: true,
      fileName: manifest
    }),

    // 需要Webpack告诉我们每个模块位于哪个捆绑包
    new ReactLoadablePlugin({
      filename: loadable
    }),

    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["You application is build successful~"],
        notes: [
          "Some additionnal notes to be displayed unpon successful compilation"
        ]
      }
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/static"),
        to: path.resolve(__dirname, "../build/static")
      }
    ])
  ],
  resolve: {
    extensions: [".js", ".jsx", "css", "less", "png", "jpg"]
  },
  optimization: {
    minimizer: []
  }
};
