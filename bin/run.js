import RouterAnalyze from "@lib/routerAnalyze";

import { resolve } from "path";

import chalk from "chalk";

const entry = resolve(__dirname, "../src/page");

const output = resolve(__dirname, "../src/.nsp/router.js");

new RouterAnalyze(entry, output, () => {
  console.log(chalk.green("路由文件已生成！"));
}).init();
