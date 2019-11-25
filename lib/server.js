import React from "react";
import { renderToString } from "react-dom/server";
import Loadable from "nodejsplgx";
import { StaticRouter } from "react-router-dom";
import { getBundles } from "nodejsplgx/webpack";
import manifest from "@build/manifest.json";
import loadJson from "@build/loadable.json";
import App from "@src/.nsp/router";
import { Inject } from "./inject";
class Server {
  // 获取客户端异步的文件
  static getAsyncOptions = (modules, json) => {
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

  // 获取客户端公共的文件
  static getPublicOptions = () => {
    const jsLinks = [];
    const cssLinks = [];
    for (let key in manifest) {
      if (key.includes("assets")) {
        key.includes("css") && cssLinks.push(manifest[key]);
        key.includes("js") && jsLinks.push(manifest[key]);
      }
    }
    return { jsLinks, cssLinks };
  };

  // 客户端文件转link和script字符串
  static getOptionsString = (modules, json) => {
    const { asyncCssLinks, asyncJsLinks } = Server.getAsyncOptions(
      modules,
      json
    );
    const { jsLinks, cssLinks } = Server.getPublicOptions();
    const js = [...jsLinks, ...asyncJsLinks];
    const css = [...cssLinks, ...asyncCssLinks];
    const scripts = js
      .map(script => `<script src="${script}"></script>`)
      .join("");
    const styles = css
      .map(style => `<link href="${style}" rel="stylesheet"/>`)
      .join("");
    return { scripts, styles };
  };

  // 服务端渲染dom树
  static getHtmlString(reqUrl, initModel, modules = []) {
    return renderToString(
      <StaticRouter location={reqUrl}>
        <Inject initModel={initModel}>
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <App />
          </Loadable.Capture>
        </Inject>
      </StaticRouter>
    );
  }

  getSsrString = (reqUrl, initModel = {}, modules = []) => {
    const htmlString = Server.getHtmlString(reqUrl, { initModel }, modules);
    const { scripts, styles } = Server.getOptionsString(modules, loadJson);
    return { htmlString, scripts, styles };
  };
}
export default Server;
