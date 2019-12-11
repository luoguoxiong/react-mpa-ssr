import Server from "@lib/server";
const nspRender = ({ title = "app" }) => {
  return async (ctx, next) => {
    await next();
    let { htmlString, scripts, styles } = new Server().getSsrString(
      ctx.path,
      ctx.initModel
    );
    await ctx.render("index", {
      title: ctx.title ? ctx.title : title,
      scripts,
      styles,
      initModel: ctx.initModel || {},
      html: htmlString
    });
  };
};
export default nspRender;
