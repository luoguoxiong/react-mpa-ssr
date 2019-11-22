import { renderForServer } from "@lib";
// import nspSet from "../../.nsp.js";
// const json = require(nspSet.loadable);
import json from "../../build/loadable.json";
const ssrJspRender = ({ title = "app" }) => {
  return async (ctx, next) => {
    await next();
    let { htmlString, scripts, styles } = renderForServer(
      ctx.path,
      ctx.initModel,
      json
    );
    await ctx.render("index", {
      title,
      scripts,
      styles,
      initModel: ctx.initModel || {},
      html: htmlString
    });
  };
};
export default ssrJspRender;
