import Koa from "koa";

import config from "../config";

import Loadable from "nodejsplgx";

import R from "ramda";

import { join, resolve } from "path";

import dev from "./utils/dev";

import chalk from "chalk";

import chokidar from "chokidar";

import RouterAnalyze from "@lib/routerAnalyze";
const { port, env } = (global.config = config);

const app = new Koa();

let middlewares = ["bodyParser", "views", "staticCache", "router"];

let watcherIsInit = false;

global.devIsRun = false;

let hmrKeyT = null;

const useMiddlewares = app => {
  const joinPathName = moduleName =>
    join(__dirname, `./middleware/${moduleName}`);

  const requirePath = pathName => require(pathName);

  // R.forEachObjIndexed：把require取得的每一个函数执行
  const useMiddleware = R.forEachObjIndexed(middlewaresUseByApp =>
    middlewaresUseByApp(app)
  );

  // R.compose从右向做执行函数，返回值是下一个函数的参数
  const Rcompose = R.compose(useMiddleware, requirePath, joinPathName);
  // R.map把middlewares作为参数，执行Rcompose的第一个函数
  R.map(Rcompose)(middlewares);
  if (!devIsRun) {
    Loadable.preloadAll().then(() => {
      app.listen(port, err => {
        console.log(
          chalk.green(
            `NODEJSP is Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`
          )
        );
      });
      devIsRun = true;
    });
  }
};

const useHotDev = callback => {
  const entry = resolve(__dirname, "../src/page");
  const output = resolve(__dirname, "../src/.nsp/router.js");
  new RouterAnalyze(entry, output, () => {
    dev(app, hotMiddleware => {
      if (hotMiddleware && typeof hotMiddleware.publish === "function") {
        if (hmrKeyT) global.clearInterval(hmrKeyT);
        const hmrKey = new Date().getSeconds();
        hmrKeyT = global.setInterval(() => {
          hotMiddleware.publish({
            action: "bundled",
            hmrKey
          });
        }, 1000);
        callback();
      }
    });
  }).init();
};

// 当初始化完成或者src/page文件发生改变时触发
const devRun = appRun => {
  const watcher = chokidar.watch(join(__dirname, "../src/page"), {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  watcher
    .on("all", (event, path) => {
      if (watcherIsInit) {
        switch (event) {
          case "add":
            appRun();
            break;
          case "unlink":
            appRun();
            break;
          case "addDir":
            appRun();
            break;
          case "unlinkDir":
            appRun();
            break;
        }
      }
    })
    .on("ready", () => {
      watcherIsInit = true;
      appRun();
      console.log(chalk.green("√ Initial watcher complete. Ready for changes"));
    });
};

if (env === "development") {
  devRun(() => {
    if (devIsRun) {
      const entry = resolve(__dirname, "../src/page");
      const output = resolve(__dirname, "../src/.nsp/router.js");
      new RouterAnalyze(entry, output).init();
    } else {
      useHotDev(() => {
        useMiddlewares(app);
      });
    }
  });
} else {
  useMiddlewares(app);
}
