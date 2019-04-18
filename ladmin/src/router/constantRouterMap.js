export const constantRouterMap = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "adminLayout" */"@/layout/Admin.vue"),
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: "home",
        name: "homeIndex",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // /* webpackChunkName: "about" */
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
      }
    ]
  }
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ "@/views/account/Login.vue")
  // },
  // {
  //   path: "/404",
  //   name: "404",
  //   component: () =>
  //     import(/* webpackChunkName: "404" */ "@/views/common/404.vue")
  // }
];

// 参考https://github.com/vuejs/vue-cli/issues/3180
// https://github.com/vuejs/vue-cli/issues/2463#issuecomment-423704639
