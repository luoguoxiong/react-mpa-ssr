import Koa from 'koa'

import config from '../config'

import Loadable from 'react-loadable'

import R from 'ramda'

import { join, resolve } from 'path'

import dev from './utils/dev'

import chalk from 'chalk'

import RouterAnalyze from '@lib/routerAnalyze'

const { port, env } = global.config = config

const app = new Koa()

const entry = resolve(__dirname, '../src/page')

const output = resolve(__dirname, '../src/.nsp/router.js')

let middlewares = ['bodyParser', 'views', 'staticCache', 'router']

let isListen = false

let hmrKeyT = null

const useMiddlewares = app => {
  const joinPathName = moduleName =>
    join(__dirname, `./middleware/${moduleName}`)

  const requirePath = pathName => require(pathName)

  // R.forEachObjIndexed：把require取得的每一个函数执行
  const useMiddleware = R.forEachObjIndexed(middlewaresUseByApp =>
    middlewaresUseByApp(app)
  )

  // R.compose从右向做执行函数，返回值是下一个函数的参数
  const Rcompose = R.compose(
    useMiddleware,
    requirePath,
    joinPathName
  )
  // R.map把middlewares作为参数，执行Rcompose的第一个函数
  R.map(Rcompose)(middlewares)
  if (!isListen) {
    Loadable.preloadAll().then(() => {
      app.listen(port, err => {
        console.log(
          chalk.green(
            `NODEJSP is Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
          )
        )
      })
    })
    isListen = true
  }
}


if (env === 'development') {
  new RouterAnalyze(entry, output, () => {
    dev(app, hotMiddleware => {
      if (hotMiddleware && typeof hotMiddleware.publish === 'function') {
        if (hmrKeyT) global.clearInterval(hmrKeyT)
        // 生成当前的热更新的key值
        const hmrKey = Math.random() * 100000 + ''
        hotMiddleware.publish({
          action: 'bundled',
          hmrKey
        })
        hmrKeyT = global.setInterval(() => {
          hotMiddleware.publish({
            action: 'bundled',
            hmrKey
          })
        }, 2000)
        useMiddlewares(app)
      }
    })
  }).init()
} else {
  useMiddlewares(app)
}


