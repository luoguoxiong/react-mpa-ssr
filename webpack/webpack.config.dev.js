const webpack = require("webpack");

const { cloneDeep } = require("lodash");

const baseConfig = require("./base");

const devConfig = cloneDeep(baseConfig);

devConfig.entry.assets.push(
  "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=0&reload=true&quiet=true"
);

devConfig.mode = "development";

devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = devConfig;
