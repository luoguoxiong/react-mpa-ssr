import Koa from "koa";
import Loadable from "nodejsplgx";
import R from "ramda";
import { join, resolve } from "path";
import chalk from "chalk";
import chokidar from "chokidar";
import RouterAnalyze from "@lib/analyze";
import dev from "./utils/dev";
const entry = resolve(__dirname, "../src/page");
const output = resolve(__dirname, "../src/.nsp/router.js");
class App {
  // wather是否初始化
  constructor(middlewares, port) {
    this.app = new Koa();
    this.isListen = false;
    this.middlewares = middlewares;
    this.port = port;
  }

  useMiddleware() {
    const joinPathName = moduleName =>
      join(__dirname, `./middleware/${moduleName}`);

    const requirePath = pathName => require(pathName);

    const useMiddleware = R.forEachObjIndexed(middlewaresUseByApp =>
      middlewaresUseByApp(this.app)
    );

    const Rcompose = R.compose(useMiddleware, requirePath, joinPathName);
    R.map(Rcompose)(this.middlewares);
  }

  createHttpServer() {
    Loadable.preloadAll().then(() => {
      this.app.listen(this.port, err => {
        console.log(
          chalk.green(
            `Nsp is Listening on port ${this.port}. Open up http://localhost:${this.port}/ in your browser.\n`
          )
        );
        this.isListen = true;
      });
    });
  }

  runDevTodo() {
    new RouterAnalyze(entry, output, () => {
      if (!this.isListen) {
        dev(this.app, () => {
          this.useMiddleware();
          !this.isListen && this.createHttpServer();
        });
      }
    });
  }

  runDev() {
    const watcher = chokidar.watch(join(__dirname, "../src/page"), {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });
    watcher.on("all", event => {
      if (
        this.isListen &&
        (event.includes("add") ||
          event.includes("unlink") ||
          event.includes("addDir") ||
          event.includes("unlinkDir"))
      ) {
        this.runDevTodo();
      }
    });
    watcher.on("ready", () => {
      console.log(chalk.green("√ Initial watcher complete. Ready for changes"));
      this.runDevTodo();
    });
  }

  runPro() {
    new RouterAnalyze(entry, output, () => {
      this.useMiddleware();
      this.createHttpServer();
    });
  }
}
export default App;
