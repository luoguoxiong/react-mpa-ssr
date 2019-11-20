import nspSet from "../../.nsp.js";
const json = require(nspSet.loadable);
import { renderForServer } from "@lib";
const render = async ({ ctx, title = "nsp", initModel }) => {
  let { htmlString, scripts, styles } = renderForServer(
    ctx.path,
    initModel,
    json
  );
  await ctx.render("index", {
    title,
    scripts,
    styles,
    initModel: initModel || {},
    html: htmlString
  });
};
export default render;
