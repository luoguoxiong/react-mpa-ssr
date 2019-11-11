const webpack = require('webpack')
const { cloneDeep } = require('lodash')

const baseConfig = require('./base')

const devConfig = cloneDeep(baseConfig)

devConfig.entry.assets.push(
  'webpack-hot-middleware/client?noInfo=true&reload=true&quiet=fasle&timeout=2000'
)

devConfig.mode = 'development'

devConfig.plugins.push(
  // 设置热更新
  new webpack.HotModuleReplacementPlugin()
)

module.exports = devConfig
