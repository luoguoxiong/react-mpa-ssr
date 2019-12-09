import { Controller, RequestMapping, NspRender } from "../decorator";
import AxiosHttp from "../utils/Http";
const Axios = new AxiosHttp({
  timeout: 10000,
  baseURL: "http://202.96.155.121:8888/api"
});
@Controller
class Home {
  @RequestMapping({ method: "get", url: "/other" })
  @NspRender({ title: "helloword" })
  async other(ctx) {
    const data = await Axios.httpRequest("/topic/list", {
      page: 1,
      size: 6
    });
    ctx.initModel = { ...data };
  }
}
export default Home;
