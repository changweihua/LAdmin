import Vue from "vue";
import Router from "vue-router";
import { Message } from "element-ui";
import store from "@/store";
import { constantRouterMap } from "@/router/constantRouterMap";

// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router);
// 实例化参数
Vue.use(require("vue-wechat-title"));

const router = new Router({
  // 解决vue框架页面跳转有白色不可追踪色块的bug
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap
});

console.log(router)

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
router.beforeEach((to, from, next) => {
  if (true || to.matched.some(res => res.meta.requireLogin)) {
    console.log('beforeEach')
    console.log(store.state)
    // 判断是否需要登录权限
    if (window.localStorage.JWT_TOKEN && window.localStorage.JWT_TOKEN !== '') {
      // 判断是否登录
      // JSON.parse(window.localStorage.getItem("JWT_TOKEN")).lifeTime
      let lifeTime = ((new Date()).getTime()) * 1000;
      let nowTime = (new Date()).getTime(); // 当前时间的时间戳
      if (nowTime < lifeTime) {
        console.log(store.state.permission.addRouters);
        // 请求新的权限
        // if (store.getters.roles.length === 0) {
        //   store.dispatch("generateRoutes", [{
        //     path: "home",
        //     name: "about",
        //     component: 'About'
        //   }]).then(() =>
        //   {
        //     // 根据roles权限生成可访问的路由表
        //     router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
        //     // next({...to, replace: true}); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //   });
        // } else {
        //   next();
        // }
        if (store.state.permission.addRouters.length === 0) {
          store.dispatch("generateRoutes", [{
            path: "home",
            name: "about",
            component: 'About'
          }]).then(() => {
            console.log(store.state.permission.routers)
            // store.getters.addRouters
            router.addRoutes(store.state.permission.routers); // 动态添加可访问路由表
            next({...to, replace: true});
          });
        } else {
          console.log(to)
          next();
        }
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
