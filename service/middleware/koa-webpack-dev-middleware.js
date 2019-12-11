import webpackDevMiddleware from "webpack-dev-middleware";

export default (compiler, options) => {
  const devMiddleware = webpackDevMiddleware(compiler, options);
  const koaMiddleware = (ctx, next) => {
    const res = {};
    res.end = data => {
      ctx.body = data;
    };
    res.setHeader = (name, value) => {
      ctx.set(name, value);
    };
    return devMiddleware(ctx.req, res, next);
  };
  Object.keys(devMiddleware).forEach(item => {
    koaMiddleware[item] = devMiddleware[item];
  });
  return koaMiddleware;
};
