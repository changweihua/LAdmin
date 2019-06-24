import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import './plugins/element.js'
// import axios from 'axios';

import ErrorPlugin from './plugins/error'
Vue.use(ErrorPlugin)

import i18n from './i18n/i18n'
// import './i18n/vuexi18n'

import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { faAmilia } from '@fortawesome/free-brands-svg-icons'
import { faAngry } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

// import { constantRouterMap } from '@/router/constantRouterMap'
library.add(fas, far, fab)
library.add(faCoffee)
library.add(faLanguage)
library.add(faAmilia)
library.add(faAngry)
Vue.component('fa-icon', FontAwesomeIcon)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

import {} from './apis/request'
import '@/components/global.js'

import '@/directive/resizes'

// import Loading from './components/loading';
// Vue.use(Loading);

// 封装好的有拦截器的axios：this.$http
import packedAxios from './utils/axios'
Vue.use(packedAxios); // 使用this.$http代替封装好的axios

Vue.config.productionTip = false

// Axios 全局设置
// axios.defaults.baseURL = process.env.API_ROOT;
// axios.defaults.timeout = 5000;
// axios.defaults.withCredentials = true;

// axios 全局配置拦截器 每次向后端请求携带 头信息
// http request 拦截器
// Start
// axios.interceptors.request.use(
//   config => {
//     config.data = config.data;
//     if (localStorage.JWT_TOKEN) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
//     }
//     // 有签名且API地址不为MockJS服务的地址
//     if (localStorage.PARTNER_SIGN && config.url.indexOf('localhost:8080') === -1) {
//       config.params = {
//         Partner: localStorage.API_PARTNER,
//         Sign: localStorage.PARTNER_SIGN
//       };
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           // store.commit('LOG_OUT')
//           router.replace({
//             name: 'login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           });
//       }
//     }
//     // 返回接口返回的错误信息
//     return Promise.reject(error.response.data);
//   });

// End

// JWT 用户权限校验，判断 TOKEN 是否在 localStorage 当中
// router.beforeEach(({ name }, from, next) => {
//   // 获取 JWT Token
//   if (localStorage.getItem('JWT_TOKEN')) {
//     // 如果用户在login页面
//     if (name === 'login') {
//       next('/');
//     } else {
//       // Todo: Check Token Is Valid
//       next();
//     }
//   } else {
//     if (name === 'login') {
//       next();
//     } else {
//       next({
//         name: 'login'
//       });
//     }
//   }
// });

Vue.prototype.L = Vue.$t

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
  // name: 'app',
  // el: '#app',
  created: function() {
    console.log('app created from main.js')
    // if (store.getters.addRouters.length > 0) {
    //   let userPath = constantRouterMap.concat(store.getters.addRouters)
    //   this.$router.addRoutes(userPath)
    //   this.$router.push('/')
    // }
  }
}).$mount('#app')
