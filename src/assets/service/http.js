import axios from "axios";

// let token = localStorage.getItem("token");
let http = axios.create({
  //创建axiox实例并配置好全局公用信息
  baseURL: process.env.VUE_APP_baseURL, //基础URL
  // timeout: 5000, //超时限制
  headers: {
    //头部信息
    // 'content-type': 'application/json' ,
    // 'Authorization': token
  }
});
//响应拦截器
http.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log(response)
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
