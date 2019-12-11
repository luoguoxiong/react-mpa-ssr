import App from "./app";
import config from "../config";
const { port, env } = config;
global.config = config;
let middlewares = ["bodyParser", "log", "views", "staticCache", "router"];
try {
  const Server = new App(middlewares, port);
  if (env === "development") {
    Server.runDev();
  } else {
    Server.runPro();
  }
} catch (e) {
  console.log(e);
}
