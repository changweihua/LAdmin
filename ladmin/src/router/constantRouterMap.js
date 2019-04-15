export const constantRouterMap = [
  {
    path: "/",
    name: "home",
    component: () => import("@/layout/Admin.vue"),
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
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/account/Login.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/common/404.vue")
  }
];