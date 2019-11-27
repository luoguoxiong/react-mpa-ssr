import webpackHotMiddleware from "webpack-hot-middleware";

import stream from "stream";

export default complimer => {
  const hotMiddleware = webpackHotMiddleware(complimer, {
    heartbeat: 500
  });
  const koaWebpackHotMiddleware = (ctx, next) => {
    ctx.body = new stream.PassThrough();
    // ctx.body = someHTTPStream
    //   .on("error", ctx.onerror)
    //   .pipe(new stream.PassThrough());
    return hotMiddleware(ctx.req, ctx.res, next);
  };
  koaWebpackHotMiddleware.hotMiddleware = hotMiddleware;
  return koaWebpackHotMiddleware;
};
