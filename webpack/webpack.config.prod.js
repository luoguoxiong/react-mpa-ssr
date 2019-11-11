const { cloneDeep } = require('lodash')

const baseConfig = require('./base')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = cloneDeep(baseConfig)

prodConfig.mode = 'production'

if (process.env.Analyze) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

prodConfig.optimization.minimizer.push(
  //压缩js
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: false
  }),
  // 压缩css
  new OptimizeCSSAssetsPlugin({})
)

module.exports = prodConfig
