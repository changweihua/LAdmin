import { constantRouterMap } from '@/router/constantRouterMap';

const _PERMISSION = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    setRouters: (state, routers) => {
      state.addRouters = routers;
      // 和已经存在的路由表拼接
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    generateRoutes({ commit }, response)
    {
      let asyncRouters = filterAsyncRouter(response);
      asyncRouters.push({ path: "*", redirect: "/404", hidden: true });
      commit("setRouters", asyncRouters);
    }
  }
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
      // router.component = loadView(router.component);
    }
    // 存在子集
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children);
    }
    return true;
  });
  
  return accessedRouters;
}

// function loadView(view) {
//   // 路由懒加载
//   return () => import(`@/view/modules/${view}`);
// }

export { _PERMISSION } ;
