import webpackHotMiddleware from 'webpack-hot-middleware'

import stream from 'stream'

export default (complimer, options) => {
  const hotMiddleware = webpackHotMiddleware(complimer, options)
  const koaWebpackHotMiddleware = (ctx, next) => {
    const streamer = new stream.PassThrough()
    ctx.body = streamer
    const res = {}
    res.write = streamer.write.bind(streamer)
    res.writeHead = (state, headers) => {
      ctx.state = state
      ctx.set(headers)
    }
    res.end = () => {}
    return hotMiddleware(ctx.req, res, next)
  }
  koaWebpackHotMiddleware.hotMiddleware = hotMiddleware
  return koaWebpackHotMiddleware
}
