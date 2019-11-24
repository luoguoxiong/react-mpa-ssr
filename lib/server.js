import React from "react";
import { renderToString } from "react-dom/server";
import Loadable from "nodejsplgx";
import { StaticRouter } from "react-router-dom";
import { Inject } from "./inject";
class App {
  constructor(component = null, modules = [], options = {}) {
    this.component = this.appInit({ modules, application: component });
    this.options = options;
  }

  // app初始化
  appInit({ modules = [], application }) {
    return (
      // 接收一个report参数,这个参数方法可以拿到每一个经由React Loadable渲染的模块的名字。
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        {application}
      </Loadable.Capture>
    );
  }

  // 服务端渲染
  renderForServer(reqUrl, initModel) {
    const context = {};
    return renderToString(
      <StaticRouter context={context} location={reqUrl}>
        <Inject initModel={initModel}>{this.component}</Inject>
      </StaticRouter>
    );
  }
}
export default App;
