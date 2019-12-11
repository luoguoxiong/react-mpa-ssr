import { Controller, RequestMapping, NspRender } from "../decorator";
import AxiosHttp from "../utils/Http";
const Axios = new AxiosHttp({
  timeout: 10000,
  baseURL: "http://202.96.155.121:8888/api"
});

@Controller
class View {
  @RequestMapping({ method: "get", url: "/" })
  @NspRender({ title: "NSP严选" })
  async home(ctx) {
    const data = await Axios.httpRequest("/");
    ctx.initModel = { ...data };
  }

  @RequestMapping({ method: "get", url: "/topic" })
  @NspRender({ title: "NSP专题" })
  async topic(ctx) {
    const data = await Axios.httpRequest("/topic/list", {
      page: 1,
      size: 6
    });
    ctx.initModel = { ...data };
  }

  @RequestMapping({ method: "get", url: "/sort" })
  @NspRender({ title: "NSP分类" })
  async topic(ctx) {
    const data = await Axios.httpRequest("/topic/list", {
      page: 1,
      size: 6
    });
    ctx.initModel = { ...data };
  }
}
export default View;
