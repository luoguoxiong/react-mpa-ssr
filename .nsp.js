const path = require("path");
const rootPath = path.resolve(__dirname, __dirname);
module.exports = {
  rootPath,
  loadable: path.join(rootPath, "/build/loadable.json"),
  manifest: path.join(rootPath, "/build/manifest.json")
};
