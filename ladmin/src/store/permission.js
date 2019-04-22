import { constantRouterMap } from '@/router/constantRouterMap';
import { asyncRouterMap } from '@/router/asyncRouterMap';
import vuexCache from "vuex-cache";
import persistedState from "vuex-persistedstate";
import createLogger from "vuex/dist/logger";

const debug = process.env.NODE_ENV !== 'production';
const createPersisted = persistedState({
  storage: window.sessionStorage
});

function hasPermission(roles, route) {
  return true;
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0);
  } else {
    return true;
  }
}
console.log(constantRouterMap)
const permissionModule = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    setRouters: (state, routers) => {
      console.log('setRouters')
      state.addRouters = routers;
      // 和已经存在的路由表拼接
      state.routers = constantRouterMap.concat(routers);
      console.log(state.routers)
    }
  },
  actions: {
    generateRoutes({ commit }, response)
    {
      console.log(response)
      // let asyncRouters = filterAsyncRouter(response);
      // asyncRouters.push({ path: "*", redirect: "/404", hidden: true });
      // commit("setRouters", asyncRouters);
      return new Promise(resolve => {
        // const { roles } = data;
        // const roles = {}
        const accessedRouters = asyncRouterMap.filter(v => {
          // if (roles.indexOf('admin') >= 0) return true;
          // if (hasPermission(roles, v)) {
          //   if (v.children && v.children.length > 0) {
          //     v.children = v.children.filter(child => {
          //       if (hasPermission(roles, child)) {
          //         return child;
          //       }
          //       return false;
          //     });
          //     return v;
          //   } else {
          //     return v;
          //   }
          // }
          return true;
        });
        console.log(accessedRouters);
        commit("setRouters", accessedRouters);
        resolve();
      });
    }
  },
  plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
};

function filterAsyncRouter(routers) {
  // 遍历后台传来的路由字符串，转换为组件对象
  let accessedRouters = routers.filter(router => {
    if (router.meta) {
      // 默认图标处理
      router.meta.icon = router.meta.icon ? router.meta.icon : "component";
    }
    if (router.component === "main") {
      // Main组件特殊处理
      // router.component = AppMain;
    } else {
      // 处理组件---重点
      router.component = loadView(router.component);
    }
    // 存在子集
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children);
    }
    return true;
  });
  
  return accessedRouters;
}

function loadView(view) {
  // 路由懒加载
  return () => import(`@/views/modules/${view}`);
}

export { permissionModule } ;
