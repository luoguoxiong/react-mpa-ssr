import React from 'react'
import { getBundles } from 'react-loadable/webpack'
import stats from '../build/react-loadable.json'
import App from './app'
import manifest from '../build/manifest.json'
import Router from '@src/.nsp/router'

// 获取客户端异步加载文件
export const getAsyncOptions = modules => {
  let bundles = getBundles(stats, modules)
  let asyncJsLinks = bundles
    .filter(bundle => bundle.file.endsWith('.js'))
    .map(item => `/${item.file}`)
  let asyncCssLinks = bundles
    .filter(bundle => bundle.file.endsWith('.css'))
    .map(item => `/${item.file}`)
  return {
    asyncJsLinks,
    asyncCssLinks
  }
}

// 获取客户端公共js和css
export const getPublicOptions = () => {
  const jsLinks = []
  const cssLinks = []
  for (let key in manifest) {
    if (key.includes('assets') || key.includes('vendor')) {
      key.includes('css') && cssLinks.push(manifest[key])
      key.includes('js') && jsLinks.push(manifest[key])
    }
    if (key.includes('dll')) {
      key.includes('js') && jsLinks.unshift(manifest[key])
    }
  }
  return { jsLinks, cssLinks }
}

// 服务端渲染js和css文件
export const setServerOptions = modules => {
  const { asyncCssLinks, asyncJsLinks } = getAsyncOptions(modules)
  const { jsLinks, cssLinks } = getPublicOptions()

  const js = [...jsLinks, ...asyncJsLinks]
  const css = [...cssLinks, ...asyncCssLinks]
  let scripts = js.map(script => `<script src="${script}"></script>`).join('')

  let styles = css
    .map(style => `<link href="${style}" rel="stylesheet"/>`)
    .join('')

  return { scripts, styles }
}

export const renderForServer = (reqUrl, initModel = {}) => {
  const modules = []
  const app = new App(<Router />, modules, {})
  const htmlString = app.renderForServer(reqUrl, { initModel })
  const { scripts, styles } = setServerOptions(modules)
  return { htmlString, scripts, styles }
}
