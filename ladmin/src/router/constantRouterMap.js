export const constantRouterMap = [
  {
    path: '',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: 'adminLayout' */ '@/views/layout/Admin.vue'),
    redirect: {
      name: 'dashboardIndex'
    },
    leaf: true,
    meta: {
      hidden: false,
      requireLogin: true,
      icon: 'thumbtack'
    },
    children: [
      {
        path: 'dashboard',
        component: () =>
          import('@/views/dashboard/index'),
        name: 'dashboardIndex',
        leaf: true,
        meta: { title: 'dashboard', hidden: false, icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '',
    name: 'about',
    leaf: true,
    component: () =>
      import(/* webpackChunkName: 'adminLayout' */ '@/views/layout/Admin.vue'),
    redirect: {
      name: 'aboutIndex'
    },
    meta: {
      hidden: false,
      requireLogin: true,
      icon: 'users'
    },
    children: [
      {
        path: 'about',
        name: 'aboutIndex',
        component: () =>
          import(/* webpackChunkName: 'hello' */ '@/views/modules/About.vue'),
        meta: {
          title: 'about',
          hidden: false,
          requireLogin: true
        },
        leaf: true
      }
    ]
  },
  {
    path: '',
    name: 'history',
    leaf: true,
    component: () =>
      import(/* webpackChunkName: 'adminLayout' */ '@/views/layout/Admin.vue'),
    redirect: {
      name: 'historyIndex'
    },
    meta: {
      hidden: false,
      requireLogin: true,
      icon: 'users'
    },
    children: [
      {
        path: 'history',
        name: 'historyIndex',
        component: () =>
          import(/* webpackChunkName: 'hello' */ '@/views/modules/History.vue'),
        meta: {
          title: 'history',
          hidden: false,
          requireLogin: false
        },
        leaf: true
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/account/Login.vue'),
    meta: {
      hidden: true,
      requireLogin: false
    },
    leaf: true
  },
  {
    path: '/404',
    name: '404',
    meta: {
      hidden: true,
      requireLogin: false
    },
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/common/404.vue')
  }
]

// 参考https://github.com/vuejs/vue-cli/issues/3180
// https://github.com/vuejs/vue-cli/issues/2463#issuecomment-423704639
