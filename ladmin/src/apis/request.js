import Vue from 'vue'
import axios from 'axios'
import { throwErr } from "@/utils" //utils 捕捉服务端http状态码的方法
import store from "@/store"  //引入vuex的相关操作
import { Message, Loading } from "element-ui" //element Toast的提示
import { auth } from '@/apis/account'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

let loading;
var CancelToken = axios.CancelToken
var source = CancelToken.source()

function startLoading() {
  loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {
  loading.close()
}

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) {
    return
  }
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// 过滤请求
axios.interceptors.request.use((config) => {
  config.timeout = 1000 * 1000
  showFullScreenLoading()
  if (store.getters.access_token !== '') {
    if (config.url !== '/api/OAuth/auth') {
      config.headers.Authorization = `Bearer ${store.getters.access_token}`
    }
    return config
  } else {
    return new Promise((resolve) => {
      if (store.getters.refresh_token !== '') {
        auth({
          refresh_token: store.getters.refresh_token,
          client_id: 'ancdkfsdfds',
          client_secret: 'dsadsfdsfds',
          grant_type: 'refresh_token'
        }).then((res) => {
          console.log(res)
        })
      }
      resolve(config)
    })
  }
}, error => {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  tryHideFullScreenLoading()
  if (response.data.code === 0) {   // 服务端定义的响应code码为0时请求成功
    return Promise.resolve(response.data); // 使用Promise.resolve 正常响应
  } else if (response.data.code === 401) { // 服务端定义的响应code码为1401时为未登录
    if (store.getters.refresh_token !== '') {
      return new Promise((resolve) => {
        auth({
          client_id: 'ancdkfsdfds',
          client_secret: 'dsadsfdsfds',
          grant_type: 'refresh_token',
          refresh_token: store.getters.refresh_token
        }).then(res => {
          console.log(res)
          resolve()
        })
      })
    } else {
      router.push("/login")
    }
    return Promise.reject(response.data)   //使用Promise.reject 抛出错误和异常
  } else {
    Message({
      message: response.data.result
    })
    return Promise.reject(response.data)
  }
}, (error) => {
  tryHideFullScreenLoading()
  const originalRequest = error.config
  if (error && error.response) {
    if (error.response.status === 401) {
      if (store.getters.refresh_token !== '') {
        return new Promise((resolve) => {
          if (error.response.data.code !== 40101 && !originalRequest._retry) {
            originalRequest._retry = true
            auth({
              refresh_token: store.getters.refresh_token,
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
    }
    let res = {}
    res.code = error.response.status
    res.msg = throwErr(error.response.status, error.response) //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
    Message({
      message: error.response.data.result || res.msg
    })
    return Promise.reject(res)
  }
  return Promise.reject(error)
})

Vue.prototype.$http = axios

export default function request(method, url, data) {  //暴露 request 给我们好API 管理
  method = method.toLocaleLowerCase();   //封装RESTful API的各种请求方式 以 post get delete为例
  // data = Object.assign({}, data, {
  //   cancelToken: source.token
  // })
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
