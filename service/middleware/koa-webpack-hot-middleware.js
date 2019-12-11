import webpackHotMiddleware from "webpack-hot-middleware";

import stream from "stream";

export default complimer => {
  const hotMiddleware = webpackHotMiddleware(complimer, {
    heartbeat: 1000
  });
  const koaWebpackHotMiddleware = async (ctx, next) => {
    ctx.body = new stream.PassThrough();
    await hotMiddleware(ctx.req, ctx.res, next);
  };
  koaWebpackHotMiddleware.hotMiddleware = hotMiddleware;
  return koaWebpackHotMiddleware;
};
