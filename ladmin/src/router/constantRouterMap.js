export const constantRouterMap = [
  {
    path: '/',
    name: 'admin',
    component: () => import(/* webpackChunkName: 'adminLayout' */'@/views/layout/Admin.vue'),
    redirect: {
      name: 'dashboard'
    },
    leaf: true,
    meta: {
      hidden: false,
      requireLogin: true
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        leaf: true,
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: true }
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
    noDropdown: true
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
