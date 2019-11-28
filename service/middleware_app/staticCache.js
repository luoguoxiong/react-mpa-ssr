import staticCache from 'koa-static-cache'
import { resolve } from 'path'
export const addStaticCache = app => {
  app.use(
    staticCache(resolve(__dirname, '../../build'), {
      maxAge: 60 * 60 * 24 * 30,
      gzip: true
    })
  )
}
