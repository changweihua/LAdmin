import { constantRouterMap, asyncRouterMap, AAdminLayout } from '@/router/constantRouterMap'
// import { asyncRouterMap } from '@/router/asyncRouterMap'
// import AdminLayout from '@/views/layout/Admin.vue'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

const permissionModule = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    setRouters: (state, routers) => {
      console.log('setRouters')
      state.addRouters = routers
      // 和已经存在的路由表拼接
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit, state }, routers) {
      return new Promise(resolve => {
        console.log(routers)
        const accessedRouters = formatAsyncRouter(routers)
        // asyncRouterMap.filter((v) => {
        //   return true
        // })
        // let lastRouters = []
        // if (state.routers) {
        //   lastRouters = accessedRouters.filter(accessedRouter => {
        //     return !state.routers.some(route => { return accessedRouter.path === route.path })
        //   })
        // } else {
        //   lastRouters = accessedRouters
        // }
        // console.log(lastRouters)
        commit('setRouters', accessedRouters)
        resolve()
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
      })
    }
  }
  // plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
}

function filterAsyncRouter(routers) {
  // 遍历后台传来的路由字符串，转换为组件对象
  console.log('filterAsyncRouter')
  let accessedRouters = routers.filter((router) => {
    if (router.meta) {
      // 默认图标处理
      router.meta.icon = router.meta.icon ? router.meta.icon : 'component'
    }
    console.log(router.component)
    let componentPath
    if (router.component === 'AdminLayout') {
      // Main组件特殊处理
      router.component = AAdminLayout
    } else {
      // 处理组件---重点
      router.component =  _import(router.component)
    }
    // 存在子集
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })

  return accessedRouters
}

function formatAsyncRouter(routers) {
  // 遍历后台传来的路由字符串，转换为组件对象
  console.log('formatAsyncRouter')
  let accessedRouters = []
  routers.forEach((router) => {
    const {
      path,
      component,
      leaf,
      meta,
      children,
      name,
      redirect
    } = router
    // if (router.meta) {
    //   // 默认图标处理
    //   router.meta.icon = router.meta.icon ? router.meta.icon : 'component'
    // }
    const nRouter = {
      path: path,
      // component: resolve => {
      //   let componentPath = ''
      //   if (component === 'AdminLayout') {
      //     // Main组件特殊处理
      //     require(['@/views/layout/Admin.vue'], resolve)
      //     return
      //   } else {
      //     // 处理组件---重点
      //     // vue的 import()函数不支持使用变量，只能是字符串（文件路径）
      //     // import只是JavaScript模块引入的关键字，不能像使用普通函数一样，使用字符串的拼接。
      //     componentPath = component
      //   }
      //   require([`${componentPath}`], resolve)
      // },
      // component: () => import('../../views/' + component + '.vue'),
      // component: resolve => require([`${component}`], resolve),
      component: component === 'AdminLayout' ? AAdminLayout : _import(component),
      name: name,
      children: (children && children.length > 0) ? formatAsyncRouter(children) : [],
      meta: meta,
      leaf: leaf,
      redirect: redirect
    }
    console.log(nRouter)
    accessedRouters.push(nRouter)
  })
  return accessedRouters
}

export { permissionModule }
