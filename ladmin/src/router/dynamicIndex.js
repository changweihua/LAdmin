/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import store from '@/store'
import { constantRouterMap } from '@/router/constantRouterMap'
import { fetchPermission } from '@/apis/account'

// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)
// 实例化参数
Vue.use(require('vue-wechat-title'))

const router = new Router({
  // 解决vue框架页面跳转有白色不可追踪色块的bug
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap
})

// 标记路由是否生成过
var isRouterGenerated = false //(sessionStorage.getItem('isRouterGenerated') || 'false') === 'true'

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
router.beforeEach((to, from, next) => {
  // 判断是否需要登录权限，如果不需要登录权限，继续执行
  console.log(to)
  var userLogined = store.getters.currentUser || store.getters.token !== ''
  if (to.matched.length > 0) {
    if (to.matched.some((res) => res.meta.requireLogin) && !userLogined) {
      console.log('当前需要身份认证')
      next({
        path: '/login'
      })
    } else {
      // 加载路由
      if (!isRouterGenerated) {
        if (!store.getters.routerLoadDone) {
          fetchPermission().then(res => {
            console.log(res.asyncRouters)
            store.dispatch('filterRoutes', res.asyncRouters)
            generateRoutes(to, next)
          })
        } else {
          console.log('AAA')
          generateRoutes(to, next)
        }
      } else {
        console.log('isRouterGenerated is true')
        next()
      }
    }
  } else {
    next('/')
  }
})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})

// 取到浏览器出现网址的最后"/"出现的后边的字符
function getLastUrl(str, yourStr) {
  str.slice(str.indexOf(yourStr) + 1)
}

function generateRoutes(to, next) {
  console.log('generateRoutes')
  isRouterGenerated = true
  // 动态添加可访问路由表
  router.addRoutes(store.getters.addRouters.concat({ path: '*', redirect: '/404', hidden: true }))
  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  // eslint-disable-next-line new-cap
  next({ ...to, replace: true })
}

export default router
