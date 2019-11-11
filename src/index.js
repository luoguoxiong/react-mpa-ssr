import 'react-app-polyfill/ie9'

import React from 'react'

import './styles/glob.less'

import App from '@lib/app'

import AppOp from './app'

const app = new App(<AppOp></AppOp>)

if (module.hot) {
  let hmrKey
  const hotClient = require('webpack-hot-middleware/client')
  hotClient.subscribe(e => {
    if (e.action === 'bundled') {
      if (hmrKey && hmrKey !== e.hmrKey) {
        window.location.reload()
      } else {
        hmrKey = e.hmrKey
      }
    }
  })
  app.render('app')
}
