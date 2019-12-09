# NSP

> Nsp以React、Koa、React-loadable搭建的MPA模式的React同构方案。

## development

```powershell
npm run dev
```

## production

```powershell
npm run build
```

## 文件夹目录

```npm
nsp
├─ bin                                   服务端启动文件
├─ build                                 webpack打包文件
├─ config                                服务端配置文件
├─ lib                                	 nsp封装的api
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

