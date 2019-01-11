import Vue from "vue";
import Router from "vue-router";
import { Message } from "element-ui"; 

// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router);
// 实例化参数
Vue.use(require("vue-wechat-title"));

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/layout/Admin.vue"),
      meta: {
        requireLogin: true
      },
      children: [
        {
          path: "home",
          name: "homeIndex",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          // /* webpackChunkName: "about" */
          component: () => import("@/views/Home.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/account/Login.vue")
    }
  ]
});

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.JWT_TOKEN && window.localStorage.JWT_TOKEN !== '') {
      // 判断是否登录
      // JSON.parse(window.localStorage.getItem("JWT_TOKEN")).lifeTime
      let lifeTime = ((new Date()).getTime()) * 1000;
      let nowTime = (new Date()).getTime(); // 当前时间的时间戳
      if (nowTime < lifeTime) {
        next();
      } else {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        next({
          path: "/login"
        });
      }
    } else {
      // 没登录则跳转到登录界面
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;
