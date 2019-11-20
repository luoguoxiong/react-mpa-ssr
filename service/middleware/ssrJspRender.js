import { renderForServer } from "@lib";
const ssrJspRender = ({ title = "app" }) => {
  return async (ctx, next) => {
    await next();
    let { htmlString, scripts, styles } = renderForServer(
      ctx.path,
      ctx.initModel
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
