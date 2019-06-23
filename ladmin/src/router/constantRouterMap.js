import AdminLayout from '@/views/layout/Admin.vue'

export const AAdminLayout = AdminLayout

export const constantRouterMap = [
  {
    path: '',
    name: 'dashboard',
    component: AdminLayout,
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
          import('@/views/dashboard/index.vue'),
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
    component: AdminLayout,
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
        component: () => import('@/views/modules/About.vue'),
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
    component: AdminLayout,
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
        component: () => import('@/views/modules/History.vue'),
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

// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/configuration',
    name: 'configuration',
    redirect: 'configurationList',
    component: AdminLayout,
    leaf: false,
    meta: {
      title: 'configuration',
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
        component: () =>
          import('@/views/configuration/List.vue'),
        meta: {
          title: 'configurationList',
          requireLogin: true
        }
      },
      {
        path: 'create',
        name: 'configurationCreate',
        leaf: true,
        component: () =>
          import('@/views/configuration/create.vue'),
        meta: {
          hidden: true,
          title: 'configurationCreate',
          requireLogin: true
        }
      },
      {
        path: 'edit/:id',
        name: 'configurationEdit',
        leaf: true,
        component: () =>
          import('@/views/configuration/edit.vue'),
        meta: {
          hidden: true,
          title: 'configurationEdit',
          requireLogin: true
        }
      }
    ]
  },
  {
    path: '/role',
    name: 'role',
    redirect: 'roleList',
    component: AdminLayout,
    leaf: false,
    meta: {
      title: 'roleList',
      requireLogin: true
    },
    children: [
      {
        path: 'list',
        name: 'roleList',
        leaf: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import('@/views/role/List.vue'),
        meta: {
          title: 'roleList',
          requireLogin: true
        }
      },
      {
        path: 'create',
        name: 'roleCreate',
        leaf: true,
        component: () =>
          import('@/views/role/create.vue'),
        meta: {
          hidden: true,
          title: 'roleCreate',
          requireLogin: true
        }
      },
      {
        path: 'edit/:id',
        name: 'roleEdit',
        leaf: true,
        component: () =>
          import('@/views/role/Edit.vue'),
        meta: {
          hidden: true,
          title: 'roleEdit',
          requireLogin: true
        }
      },
      {
        path: 'assign/:id',
        name: 'roleAssign',
        leaf: true,
        component: () =>
          import('@/views/role/Assign.vue'),
        meta: {
          hidden: true,
          title: 'roleAssign',
          requireLogin: true
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: 'userList',
    component: AdminLayout,
    leaf: false,
    meta: {
      title: 'userList',
      requireLogin: true
    },
    children: [
      {
        path: 'list',
        name: 'userList',
        leaf: true,
        component: () =>
          import('@/views/user/List.vue'),
        meta: {
          title: 'userList',
          requireLogin: true
        }
      },
      {
        path: 'create',
        name: 'userCreate',
        leaf: true,
        component: () =>
          import('@/views/user/Create.vue'),
        meta: {
          hidden: true,
          title: 'userCreate',
          requireLogin: true
        }
      },
      {
        path: 'edit/:id',
        name: 'userEdit',
        leaf: true,
        component: () =>
          import('@/views/user/Edit.vue'),
        meta: {
          hidden: true,
          title: 'userEdit',
          requireLogin: true
        }
      }
    ]
  }
]
