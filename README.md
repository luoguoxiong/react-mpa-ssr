# NSP

### 一、构建流程

> 1. 安装webpack webpack-cli 包

```shell
cnpm install webpack webpack-cli -D
```

> 2. 安装babel相关包

``` shell
cnpm install @babel/core @babel/preset-env @babel/preset-react babel-loader core-js @babel/cli -D

cnpm install  @babel/plugin-proposal-class-properties -D

cnpm install @babel/plugin-proposal-decorators -D 

cnpm  install -D babel-plugin-module-resolver
```

> 3. 添加.babelrc配置文件

```babel
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["IE >= 9"]
        },
        "corejs": "3",
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": []
}
```

> 3. 安装webpack相关包

```sh
cnpm i mini-css-extract-plugin webpackbar webpack-manifest-plugin react-loadable -D

cnpm install lodash webpack-bundle-analyzer uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin hard-source-webpack-plugin -D

cnpm install less less-loader css-loader -D
```

> 4. 安装react相关包

```sh
cnpm install react react-dom -S
cnpm install react-loadable react-router-dom react-redux @rematch/core -S
```

> 5. 安装相关启动包

```shell
cnpm install cross-env nodemon npm-run-all -D
```

> 6. 安装兼容IE9包

> cnpm install react-app-polyfill -D

