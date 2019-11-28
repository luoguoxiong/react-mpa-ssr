import bodyParser from 'koa-bodyparser'
export const addBodyParser = app => {
  app.use(bodyParser())
}
