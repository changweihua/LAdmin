// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: 'adminLayout' */ '@/layout/Admin.vue'),
    // redirect: {
    //   name: 'home'
    // },
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: 'home',
        name: 'homeIndex',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // /* webpackChunkName: 'about' */
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/Home.vue')
      }
    ]
  }
  // {
  //   path: '/permission',
  //   // name: 'permissionhome',
  //   meta: {
  //     title: 'permission',
  //     icon: 'el-icon-setting',
  //     roles: ['admin']
  //   },
  //   component: resolve => require(['../components/common/Home.vue'], resolve),
  //   children: [
  //     {
  //       name: 'permission',
  //       path: '/permission',
  //       meta: {
  //         title: 'permission', icon: 'el-icon-menu', roles: ['admin']
  //       },
  //       component: resolve => require(['../components/page/permission.vue'], resolve)
  //     }
  //   ]
  // },
]
