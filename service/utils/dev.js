import webpack from 'webpack'

import koaWebpackDevMiddleware from '../middleware/koa-webpack-dev-middleware'

import koaWebpackHotMiddleware from '../middleware/koa-webpack-hot-middleware'

const webpackClientConfig = require('../../webpack/webpack.config.dev')

export default (app, serverCompilerDone) => {
  const clientCompiler = webpack(webpackClientConfig)

  const koaWebpackHotMiddlewareObject = koaWebpackHotMiddleware(
    clientCompiler,
    {
      heartbeat: 1000
    }
  )
  let hotMiddleware = koaWebpackHotMiddlewareObject.hotMiddleware
  clientCompiler.plugin('done', () => {
    return serverCompilerDone.call(null, hotMiddleware)
  })

  app.use(koaWebpackDevMiddleware(clientCompiler, {}))
  app.use(koaWebpackHotMiddlewareObject)
}
