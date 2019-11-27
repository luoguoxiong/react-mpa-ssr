const url = require("url");
function MyPlugin() {}
function todo(compiler, compilation) {
  let context = compiler.options.context;
  let manifest = {};

  compilation.chunks.forEach(chunk => {
    chunk.files.forEach(file => {
      for (const module of chunk.modulesIterable) {
        let publicPath = url.resolve(
          compilation.outputOptions.publicPath || "",
          file
        );

        let currentModule = module;
        if (module.constructor.name === "ConcatenatedModule") {
          currentModule = module.rootModule;
        }

        if (
          currentModule.rawRequest &&
          !manifest[currentModule.rawRequest] &&
          (currentModule.rawRequest.includes("../page/") ||
            currentModule.rawRequest.includes("./src/index.js"))
        ) {
          manifest[currentModule.rawRequest] = [];
        }
        if (
          currentModule.rawRequest &&
          (currentModule.rawRequest.includes("../page/") ||
            currentModule.rawRequest.includes("./src/index.js"))
        ) {
          manifest[currentModule.rawRequest].push({
            file
          });
        }
      }
    });
  });
  console.log(manifest);
}
MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    todo(compiler, compilation);
    callback();
  });
};

module.exports = MyPlugin;
