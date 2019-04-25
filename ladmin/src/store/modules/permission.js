import { constantRouterMap } from '@/router/constantRouterMap'
import { asyncRouterMap } from '@/router/asyncRouterMap'
// import vuexCache from 'vuex-cache';
// import persistedState from 'vuex-persistedstate'
// import createLogger from 'vuex/dist/logger'

// const debug = process.env.NODE_ENV !== 'production'
// const createPersisted = persistedState({
//   storage: window.sessionStorage
// })

// function hasPermission(roles, route) {
//   return true
//   // if (route.meta && route.meta.role) {
//   //   return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   // } else {
//   //   return true
//   // }
// }

const permissionModule = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    routerLoadDone: false
  },
  mutations: {
    RESET_ROUTERLOADDONE: (state, routerLoadDone) => {
      state.routerLoadDone = routerLoadDone
      state.routers = constantRouterMap
      state.addRouters = []
    },
    setRouters: (state, routers) => {
      console.log('setRouters')
      state.addRouters = routers
      // 和已经存在的路由表拼接
      state.routers = constantRouterMap.concat(routers)
      // 404 页 '*' 放在所有route之后
      // let notFound = { path: '*', redirect: '/404', meta: { hidden: true } }

      // state.addRouters.push(notFound)
      // state.routers.push(notFound)
      state.routerLoadDone = true
    }
  },
  actions: {
    generateRoutes({ commit, state }, response) {
      console.log(response)
      const accessedRouters = asyncRouterMap.filter((v) => {
        console.log(v)
        return true
      })
      let lastRouters = []
      if (state.routers) {
        lastRouters = accessedRouters.filter(accessedRouter => {
          return !state.routers.some(route => { return accessedRouter.path === route.path })
        })
      } else {
        lastRouters = accessedRouters
      }

      commit('setRouters', lastRouters)
      // let asyncRouters = filterAsyncRouter(response);
      // asyncRouters.push({ path: '*', redirect: '/404', hidden: true });
      // commit('setRouters', asyncRouters);
      // return new Promise((resolve) => {
      //   // const { roles } = data;
      //   // const roles = {}
      //   const accessedRouters = asyncRouterMap.filter((v) => {
      //     // if (roles.indexOf('admin') >= 0) return true;
      //     // if (hasPermission(roles, v)) {
      //     //   if (v.children && v.children.length > 0) {
      //     //     v.children = v.children.filter(child => {
      //     //       if (hasPermission(roles, child)) {
      //     //         return child;
      //     //       }
      //     //       return false;
      //     //     });
      //     //     return v;
      //     //   } else {
      //     //     return v;
      //     //   }
      //     // }
      //     console.log(v)
      //     return true
      //   })

      //   commit('setRouters', accessedRouters)
      //   resolve()
      // })
    }
  }
  // plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
}

// function filterAsyncRouter(routers) {
//   // 遍历后台传来的路由字符串，转换为组件对象
//   let accessedRouters = routers.filter((router) => {
//     if (router.meta) {
//       // 默认图标处理
//       router.meta.icon = router.meta.icon ? router.meta.icon : 'component'
//     }
//     if (router.component === 'main') {
//       // Main组件特殊处理
//       // router.component = AppMain;
//     } else {
//       // 处理组件---重点
//       router.component = loadView(router.component)
//     }
//     // 存在子集
//     if (router.children && router.children.length) {
//       router.children = filterAsyncRouter(router.children)
//     }
//     return true
//   })

//   return accessedRouters
// }

// function loadView(view) {
//   // 路由懒加载
//   return () => import(`@/views/modules/${view}`)
// }

export { permissionModule }
