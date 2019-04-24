// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/configuration',
    name: 'configuration',
    // redirect: 'list',
    component: () =>
      import(/* webpackChunkName: 'adminLayout' */ '@/views/layout/Admin.vue'),
    // redirect: {
    //   name: 'home'
    // },
    leaf: false,
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: 'list',
        name: 'configurationList',
        leaf: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // /* webpackChunkName: 'about' */
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/Home.vue'),
        meta: {
          requireLogin: true
        }
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
