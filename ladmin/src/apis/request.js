import Vue from "vue";
import axios from "axios";
import { throwErr } from "@/utils"; //utils 捕捉服务端http状态码的方法
// import store from "../store/index";   //引入vuex的相关操作
import { Message, Loading } from "element-ui"; //element Toast的提示
// import router from "@/router";
import { auth } from '@/apis/account'

axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.API_ROOT;

let loading;
// let cancel, promiseArr = {}
// const CancelToken = axios.CancelToken

function startLoading() {    // 使用Element loading-start 方法
  loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
  });
}
function endLoading() {    // 使用Element loading-close 方法
  loading.close();
}
// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
      startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) {
    return;
  }
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// 过滤请求
axios.interceptors.request.use(config => {
  //发起请求时，取消当前正在进行的相同请求?
  //GET和POST，PUT，DELETE路径一样怎么办
  // if (promiseArr[config.url]) {
  //   promiseArr[config.url]('操作取消')
  //   promiseArr[config.url] = cancel
  // } else {
  //   promiseArr[config.url] = cancel
  // }

  // config 为请求的一些配置 例如：请求头 请求时间 Token  可以根据自己的项目需求个性化配置，参考axios的中文说明手册  自己多动动手
  // 由于我们项目的后端大大给力，很多东西在服务端帮我们处理好了所以请求阶段只要传好参数就好了
  config.timeout = 1000 * 1000; // 请求响应时间
  console.log(config)
  showFullScreenLoading();
  if (localStorage.JWT_TOKEN) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (config.url !== '/api/OAuth/auth') {
      config.headers.Authorization = `Bearer ${localStorage.JWT_TOKEN}`;
    }
    return config;
  } else {
    return new Promise(resolve => {
      // 根据refresh获取token
      auth({
        refresh_token: localStorage.REFRESH_TOKEN,
        client_id: 'ancdkfsdfds',
        client_secret: 'dsadsfdsfds',
        grant_type: 'refresh_token'
      }).then(res => {
        console.log(res)
      })
      // authentication.acquireToken().then(token => {
      //   config.headers['Authorization'] = 'Bearer ' + token
      //   // 添加时间戳 防止get请求缓存
      //   if (['get', 'delete', 'head', 'options'].some(m => m === config.method)) {
      //     config.url = config.url.indexOf('?') === -1 ? (config.url + '?_=' + (new Date()).getTime()) : (config.url + '&_=' + (new Date()).getTime())
      //   }
      //   resolve(config)
      // })
      resolve(config)
    })
  }
}, error => {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    console.log(response)
    if (response.data.code === 0) {   // 服务端定义的响应code码为0时请求成功
      return Promise.resolve(response.data); // 使用Promise.resolve 正常响应
    } else if (response.data.code === 401) { // 服务端定义的响应code码为1401时为未登录
      store.dispatch("setUserInfo", {});
      return new Promise(resolve => {
        console.log('refresh token')
        auth({
          client_id: 'ancdkfsdfds',
          client_secret: 'dsadsfdsfds',
          grant_type: 'refresh_token',
          refresh_token: localStorage.REFRESH_TOKEN
        }).then(res => {
          console.log(res)
        })
      })
      // router.push("/login")
      return Promise.reject(response.data);   //使用Promise.reject 抛出错误和异常
    } else {
      Message({
        message: response.data.result
      })
      return Promise.reject(response.data);
    }
  },
  error => {
    tryHideFullScreenLoading();
    const originalRequest = error.config
    console.log(error.response.status)
    if (error && error.response) {
      if (error.response.status === 401) {
        return new Promise(resolve => {
          console.log('refresh token')
          if (error.response.data.code !== 40101 && !originalRequest._retry) {
            originalRequest._retry = true
            auth({
              refresh_token: localStorage.REFRESH_TOKEN,
              client_id: 'ancdkfsdfds',
              client_secret: 'dsadsfdsfds',
              grant_type: 'refresh_token'
            }).then(res => {
              console.log(res)
              window.localStorage.setItem('JWT_TOKEN', res.access_token)
              window.localStorage.setItem('REFRESH_TOKEN', res.refresh_token)
              axios.defaults.headers.common.Authorization = 'Bearer ' + res.access_token
              // retry request
              originalRequest.headers.Authorization = 'Bearer ' + res.access_token
              return axios(originalRequest)
            })
          }
        })
      }
      let res = {};
      res.code = error.response.status;
      res.msg = throwErr(error.response.status, error.response); //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
      Message({
        message: error.response.data.result || res.msg
      })
      return Promise.reject(res);
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axios;

export default function request(method, url, data) {  //暴露 request 给我们好API 管理
  method = method.toLocaleLowerCase();   //封装RESTful API的各种请求方式 以 post get delete为例
  if (method === "post") {
    return axios.post(url, data);   //axios的post 默认转化为json格式
  } else if (method === "get") {     
    return axios.get(url, {
      params: data
    });
  } else if (method === "delete") {
    return axios.delete(url, {
      params: data
    });
  } else if (method === "put") {
    return axios.put(url, data);
  }
}

// export default function request(method, url, data) {  //暴露 request 给我们好API 管理
//   method = method.toLocaleLowerCase();   //封装RESTful API的各种请求方式 以 post get delete为例
//   if (method === "post") {
//     return new Promise((resolve, reject) => {
//       // axios的post 默认转化为json格式
//       axios.post(url, data).then(response => {
//         resolve(response.data);
//       }).catch(err => {
//         reject(err);
//       });
//     });
//   } else if (method === "get") {     
//     return new Promise((resolve, reject) => {
//       axios.get(url, {
//         params: data
//       }).then(response => {
//         resolve(response.data);
//       }).catch(err => {
//         reject(err);
//       });
//     });
//   } else if (method === "delete") {
//     return new Promise((resolve, reject) => {
//       axios.delete(url, {
//         params: data
//       }).then(response => {
//         resolve(response.data);
//       }).catch(err => {
//         reject(err);
//       });
//     });
//   }
// }
