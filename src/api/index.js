import HttpUtils from "./http";
class Https {
  postLogin = parmas => HttpUtils.post("/auth/loginByMobile", parmas);

  getTopicList = params => HttpUtils.get("/topic/list", params);
}
export default new Https();
