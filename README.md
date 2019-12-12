# NSP

> Nsp以React、Koa、React-loadable搭建的MPA模式的React同构方案。
>
> demo预览地址：http://www.nodesp.top:8082

## Development

```powershell
npm run dev
```

## Production

```powershell
npm run build
```

## analyze

```powershell
npm run analyze
```

## Directory

```npm
nsp
├─ bin                                   服务端启动文件
├─ build                                 webpack打包文件
├─ config                                服务端配置文件
├─ lib                                	 封装的api
├─ logs                                	 服务日志文件
├─ service                               服务端代码
    ├─ controller                        控制器（页面渲染或者接口输出）
    ├─ decorator                         控制器装饰器（路由中间装饰器）
    ├─ middleware                        中间件
    ├─ middleware_app                    app使用的中间件
    ├─ utils                             工具方法
    ├─ views                             koa-views渲染模板
├─ src                                   页面相关目录
    ├─ .nsp                              自动生成的路由文件
	├─ page                              页面路由文件
	├─ static                            静态文件
├─ webpack                               webpack相关配置
├─ .nsp.js                               nsp配置文件
├─ postcss.config.js                     postcss配置文件
├─ jsconfig.json                         vscode配置文件
├─ nodemon.json                          nodemon配置文件
└─ pm2.json                              pm2启动文件
```

## Helloword

#### 1.src/page/index.js

```js
import React from "react";
import { setInitModel } from "@lib/inject";
@setInitModel
export default class Helloword extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props)}</div>;
  }
}
```

#### 2. service/controller/home.js

```js
import { Controller, RequestMapping, NspRender } from "../decorator";
import AxiosHttp from "../utils/Http";
const Axios = new AxiosHttp({
  timeout: 10000,
  baseURL: "http://202.96.155.121:8888/api"
});
@Controller
class Home {
  @RequestMapping({ method: "get", url: "/other" })
  @NspRender({ title: "helloword" })
  async other(ctx) {
    const data = await Axios.httpRequest("/topic/list", {
      page: 1,
      size: 6
    });
    ctx.initModel = { ...data };
  }
}
export default Home;
```

## Api

#### 1.@setInitModel

> 服务端数据与组件建立联系。

#### 2.@Controller

> 1. 声明当前类是个控制器。
>
> 2. 在/service/controller文件建立控制器，并在改使用@Controller。

#### 3. @RequestMapping({ method = String, url = String })

> 1. 声明当前类的方法的请求方式和请求路由。
> 2. method: Get、Post;url:请求路径。
> 3. 注意：在当前类，方法名不要重复。

#### 4.@NspRender({ title = String })

> 1. 声明当前方法是用于服务端渲染。
> 2. title: 当前渲染的html的title名称。
> 3. 使用ctx.initModel = 'youData'注入数据。
> 4. 使用ctx.title = 'xxtitle'覆盖装饰器的title。

## Complete

> 1. 自动编译`src/page`目录下文件，生成路由文件
> 2. 服务端日志
> 3. 放弃redux,简单使用context注入数据
> 4. 热更新
> 5. 按需加载

## 缺陷

> 1.热更新只是客户端资源的热更新，服务端通过nodemon每次都是重启服务，webpack执行时间稍长。
>
> 2.引用第三方组件库不是很兼容，如：antd-design，（样式引入问题，可引入其库的css cdn地址！）

## 兼容性

> IE9+,及其主流浏览器

### 喜欢的朋友，顺手帮忙点个赞吧~万分感谢！ - _ -！