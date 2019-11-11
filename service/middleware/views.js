import views from 'koa-views'
import { resolve } from 'path'
export const addViews = app => {
  app.use(
    views(resolve(__dirname, '../views'), {
      extension: 'ejs'
    })
  )
}
