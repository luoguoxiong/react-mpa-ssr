import axios from "axios";
class Http {
  constructor({ timeout = 10000, baseURL = "" }) {
    this.Server = axios.create({
      baseURL,
      timeout,
      withCredentials: true
    });
  }

  async httpRequest(url, params, method = "get") {
    const obj =
      method === "get"
        ? { params }
        : {
            ...params
          };
    return (await this.Server[method](url, obj)).data;
  }
  // 添加其他请求(文件上传....) todo
}
module.exports = Http;
