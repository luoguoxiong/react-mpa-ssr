import { Controller, RequestMapping, NspRender } from "../decorator";
@Controller
class Admin {
  @RequestMapping({ method: "get", url: "/" })
  @NspRender({ title: "首页" })
  async home(ctx) {
    ctx.initModel = { goods: [1, 2, 3, 4, 5, 6, 7, 8] };
  }

  @RequestMapping({ method: "get", url: "/user" })
  @NspRender({ title: "我的页" })
  async user(ctx) {
    ctx.initModel = { userId: 5 };
  }

  @RequestMapping({ method: "get", url: "/detail" })
  async test(ctx) {
    ctx.body = { a: 2 };
  }

  @RequestMapping({ method: "get", url: "/goods" })
  @NspRender({ title: "goods" })
  async goods(ctx) {
    ctx.initModel = { info: { a: 2, b: 4 } };
  }
}
export default Admin;
