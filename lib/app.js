import React from 'react'
import { renderToString } from 'react-dom/server'
import Loadable from 'nodejsplgx'
import { hydrate, render } from 'react-dom'
import isServer from './isServer'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
class App {
  constructor(component = null, modules = [], options = {}) {
    this.component = this.appInit({ modules, application: component })
    this.options = options
  }

  createStore (initialState) {
    this.store = init({
      models: {
        initModel: {
          state: {}
        }
      },
      redux: {
        initialState
      }
    })
  }

  // app初始化
  appInit ({ modules = [], application }) {
    if (isServer) {
      return (
        // 接收一个report参数,这个参数方法可以拿到每一个经由React Loadable渲染的模块的名字。
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          {application}
        </Loadable.Capture>
      )
    } else {
      this.createStore({ initModel: window.__initModel__ })
      return (
        <Provider store={this.store}>
          <BrowserRouter>{application}</BrowserRouter>
        </Provider>
      )
    }
  }

  // 服务端渲染
  renderForServer (reqUrl, initModel) {
    this.createStore(initModel)
    const context = {}
    return renderToString(
      <StaticRouter context={context} location={reqUrl}>
        <Provider store={this.store}>{this.component}</Provider>
      </StaticRouter>
    )
  }

  // 客户端渲染
  renderForBrowser (selector) {
    window.onload = () => {
      // 我们可以Loadable.preloadReady()在客户端上使用该方法来预加载页面中包含的可加载组件。
      Loadable.preloadReady().then(() => {
        // 热更新环境？？？
        if (process.env.NODE_ENV === 'production') {
          hydrate(this.component, document.getElementById(selector))
        } else {
          render(this.component, document.getElementById(selector))
        }
      })
    }
  }

  render (selector) {
    return this.renderForBrowser(selector)
  }
}
export default App
