import webpackDevMiddleware from 'webpack-dev-middleware'

export default (compiler, options) => {
  const devMiddleware = webpackDevMiddleware(compiler, options)
  const koaMiddleware = (ctx, next) => {
    const res = {}
    res.end = data => {
      ctx.body = data
    }
    res.setHeader = (name, value) => {
      ctx.headers[name] = value
      if (name === 'Content-Type' && typeof value === 'string') {
        ctx.type = value
      }
    }
    return devMiddleware(ctx.req, res, next)
  }
  Object.keys(devMiddleware).forEach(item => {
    koaMiddleware[item] = devMiddleware[item]
  })
  return koaMiddleware
}
