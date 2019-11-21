import { Controller, RequestMapping, JspRender } from "../decorator";
import render from "../utils/render";

@Controller
class Admin {
  @RequestMapping({ method: "get", url: "/" })
  async home(ctx) {
    const initModel = { goods: [1, 2, 3, 4, 5, 6, 7] };
    await render({ ctx, title: "首页", initModel });
  }

  @RequestMapping({ method: "get", url: "/user" })
  async user(ctx) {
    const initModel = { userId: 5 };
    await render({ ctx, title: "user", initModel });
  }

  @RequestMapping({ method: "get", url: "/detail" })
  async test(ctx) {
    const initModel = { user: 10 };
    await render({ ctx, title: "detail", initModel });
  }

  @RequestMapping({ method: "get", url: "/goods" })
  async goods(ctx) {
    const initModel = { info: { a: 2, b: 4 } };
    await render({ ctx, title: "goods", initModel });
  }
}
export default Admin;
