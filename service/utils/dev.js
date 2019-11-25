import webpack from "webpack";

import koaWebpackDevMiddleware from "../middleware/koa-webpack-dev-middleware";

import koaWebpackHotMiddleware from "../middleware/koa-webpack-hot-middleware";

const webpackClientConfig = require("../../webpack/webpack.config.dev");

export default (app, callback) => {
  let hmrKeyT = null;

  const clientCompiler = webpack(webpackClientConfig);

  const koaWebpackHotMiddlewareObject = koaWebpackHotMiddleware(clientCompiler);

  let hotMiddleware = koaWebpackHotMiddlewareObject.hotMiddleware;
  clientCompiler.plugin("done", () => {
    if (hotMiddleware && typeof hotMiddleware.publish === "function") {
      if (hmrKeyT) global.clearInterval(hmrKeyT);
      const hmrKey = new Date().getSeconds();
      hmrKeyT = global.setInterval(() => {
        hotMiddleware.publish({
          action: "bundled",
          hmrKey
        });
      }, 1000);
      callback();
    }
  });

  app.use(
    koaWebpackDevMiddleware(clientCompiler, {
      stats: "errors-only"
    })
  );
  app.use(koaWebpackHotMiddlewareObject);
};
