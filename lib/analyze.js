import fs from "fs";
import chalk from "chalk";
import path from "path";
import { pageIgnore, pageOnly } from "../.nsp";
class RouterAnalyze {
  constructor(entry, output, callback) {
    this.entry = entry;
    this.output = output;
    this.extensions = pageIgnore;
    this.callback = callback || null;
    this.jsRouterLinks = [];
    this.isRight = true;
    this.init();
  }
  init() {
    this.compileDir(this.entry, "");
    if (this.isRight) {
      const strings = this.writeTemplate(this.jsRouterLinks);
      this.writeFile(this.output, strings, this.callback);
    } else {
      console.log("文件夹路由编译错误！");
    }
  }

  // 生成需要写的内容
  writeTemplate(jsRouterLinks) {
    let str =
      'import React, { Fragment } from "react";\n' +
      'import { Route } from "react-router-dom";\n' +
      'import Loadable from "@nsp";\n\n';
    let routerStr = "const routes = [\n";
    jsRouterLinks.forEach(item => {
      const componentName = `Nsp${item.replace(/\//g, "_")}`;
      const pathName = `../page${item}`;
      str += this.templateLoadable(componentName, pathName) + "\n\n";
      routerStr += this.templateRoutes(componentName, item);
    });

    return str + routerStr + "]\n\n" + this.templateApp();
  }

  templateLoadable(componentName, path) {
    return (
      `const ${componentName} = Loadable({\n` +
      `  loader: () => import(/* webpackChunkName: '${componentName}' */ '${path}')\n` +
      `});`
    );
  }

  templateRoutes(componentName, path) {
    return (
      "  {\n" +
      `    path: "${path}",\n` +
      `    component: <${componentName} />\n` +
      `  },\n`
    );
  }

  templateApp() {
    return (
      "class App extends React.Component {\n" +
      "  render () {\n" +
      "    return (\n" +
      "      <Fragment>\n" +
      "        {routes.map(item => (\n" +
      "          <Route path={item.path} exact key={item.path}>\n" +
      "            {item.component}\n" +
      "          </Route>\n" +
      "        ))}\n" +
      "      </Fragment>\n" +
      "    );\n" +
      "  }\n" +
      "}\n\n" +
      "export default App;"
    );
  }

  // compileDir
  compileDir(entry, prefix) {
    let { code, files } = this.isHasDir(entry);
    files = files.filter(
      item => !item.endsWith(".less") && !item.endsWith(".css")
    );
    if (this.extensions.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let item = files[i];
        for (let exItem of this.extensions) {
          if (item === exItem) {
            files.splice(i, 1);
            i--;
          }
        }
      }
    }
    if (code) {
      // 有文件
      if (files.length > 0) {
        for (let item of files) {
          // 判断是否有重复的
          for (let _item of files) {
            if (item !== _item && item.includes(_item)) {
              console.log(
                chalk.red(
                  `× ${entry}文件夹的${item}和${_item}重复命名！请删除其一！`
                )
              );
              this.isRight = false;
            }
          }
          // 没有重复
          // 以index.js结尾的文件
          if (item.endsWith("index.js")) {
            this.jsRouterLinks.push(prefix == "" ? "/" : prefix);
          } else if (item.endsWith(".js")) {
            this.jsRouterLinks.push(prefix + `/${item.match(/(\S*).js/)[1]}`);
          } else if (item) {
            const nextPath = path.join(entry, `/${item}`);
            this.compileDir(nextPath, prefix + `/${item}`);
          }
        }
      } else {
        // 没有文件
        console.log(chalk.yellow(`- ${entry}文件夹没有文件~`));
      }
    } else {
      console.log(chalk.red(`× ${entry}文件夹解析错误！`));
      this.isRight = false;
    }
  }

  // 写文件内容
  writeFile(outputFile, content, callback) {
    let result = "";
    try {
      result = fs.readFileSync(outputFile, "utf8");
    } catch (e) {
      fs.mkdirSync("src/.nsp");
    }
    if (result === content) {
      console.log(chalk.green("√ 文件不需要更新！"));
      callback && callback();
    } else {
      fs.writeFile(outputFile, content, err => {
        console.log(chalk.green("√ 文件更新成功！"));
        callback && callback();
        if (err) {
          console.log(chalk.red("× 文件更新失败！"));
          throw err;
        }
      });
    }
  }

  // 判断是否存在目录
  isHasDir(inPath) {
    try {
      const files = fs.readdirSync(inPath);
      return { code: true, files };
    } catch (e) {
      return { code: false, files: [] };
    }
  }
}

export default RouterAnalyze;
