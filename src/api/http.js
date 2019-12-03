import axios from "axios";
const instance = axios.create({
  baseURL: "",
  withCredentials: true // 跨域类型时是否在请求中协带cookie
});
export default class HttpUtil {
  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params })
        .then(({ data }) => {
          if (data.errno === 0) {
            resolve(data.data);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          reject({ err: JSON.stringify(err) });
        });
    });
  }
  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, { ...params })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject({ err: JSON.stringify(err) });
        });
    });
  }
}
