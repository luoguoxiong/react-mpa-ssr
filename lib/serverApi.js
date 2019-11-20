import React from "react";
import { getBundles } from "nodejsplgx/webpack";
import App from "./server";
import manifest from "../build/manifest.json";
import Router from "@src/.nsp/router";

// 获取客户端异步加载文件
const getAsyncOptions = (modules, json) => {
  let bundles = getBundles(json, modules);
  let asyncJsLinks = bundles
    .filter(bundle => bundle.file.endsWith(".js"))
    .map(item => `/${item.file}`);
  let asyncCssLinks = bundles
    .filter(bundle => bundle.file.endsWith(".css"))
    .map(item => `/${item.file}`);
  return {
    asyncJsLinks,
    asyncCssLinks
  };
};

// 获取客户端公共js和css
const getPublicOptions = () => {
  const jsLinks = [];
  const cssLinks = [];
  for (let key in manifest) {
    if (key.includes("assets") || key.includes("vendor")) {
      key.includes("css") && cssLinks.push(manifest[key]);
      key.includes("js") && jsLinks.push(manifest[key]);
    }
    if (key.includes("dll")) {
      key.includes("js") && jsLinks.unshift(manifest[key]);
    }
  }
  return { jsLinks, cssLinks };
};

// 服务端渲染js和css文件
const setServerOptions = (modules, json) => {
  const { asyncCssLinks, asyncJsLinks } = getAsyncOptions(modules, json);
  const { jsLinks, cssLinks } = getPublicOptions();

  const js = [...jsLinks, ...asyncJsLinks];
  const css = [...cssLinks, ...asyncCssLinks];
  let scripts = js.map(script => `<script src="${script}"></script>`).join("");

  let styles = css
    .map(style => `<link href="${style}" rel="stylesheet"/>`)
    .join("");

  return { scripts, styles };
};

export const renderForServer = (reqUrl, initModel = {}, json) => {
  const modules = [];
  const app = new App((<Router />), modules, {});
  const htmlString = app.renderForServer(reqUrl, { initModel });
  const { scripts, styles } = setServerOptions(modules, json);
  return { htmlString, scripts, styles };
};
