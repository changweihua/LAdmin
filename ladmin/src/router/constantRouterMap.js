export const constantRouterMap = [
  // {
  //   path: "/",
  //   name: "admin",
  //   component: () => import(/* webpackChunkName: "adminLayout" */"@/layout/Admin.vue")
  //   // redirect: '/home'
  // },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/account/Login.vue"),
    meta: {
      hidden: true,
      icon: 'home'
    },
    noDropdown: true
  },
  // {
  //   path: "/404",
  //   name: "404",
  //   component: () =>
  //     import(/* webpackChunkName: "404" */ "@/views/common/404.vue")
  // }
];

// 参考https://github.com/vuejs/vue-cli/issues/3180
// https://github.com/vuejs/vue-cli/issues/2463#issuecomment-423704639
