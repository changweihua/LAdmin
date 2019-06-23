/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import store from '@/store'
import { constantRouterMap } from '@/router/constantRouterMap'
import { fetchPermission } from '@/apis/account'

const _import = require('./_import_' + process.env.NODE_ENV)

// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)
// 实例化参数
Vue.use(require('vue-wechat-title'))

const createRouter = () => new Router({
  mode: 'history',
  // 解决vue框架页面跳转有白色不可追踪色块的bug
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 标记路由是否生成过
var isRouterGenerated = false //(sessionStorage.getItem('isRouterGenerated') || 'false') === 'true'

const whiteList = ['/login']

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
router.beforeEach((to, from, next) => {
  // 判断是否需要登录权限，如果不需要登录权限，继续执行
  console.log(`store.getters.access_token=${store.getters.access_token}`)
  var hasToken = store.getters.access_token !== ''
  console.log(`hasToken=${hasToken}`)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.currentUser) {
        console.log('获取用户信息')
        store.dispatch('FETCH_PROFILE').then(res => { // 拉取user_info
          store.dispatch('GenerateRoutes', store.getters.currentPermissions).then(() => { // 生成可访问的路由表
            isRouterGenerated = true
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        if (store.getters.addRouters.length > 0 && !isRouterGenerated) {
          console.log('load from vuex')
          isRouterGenerated = true
          console.log(store.getters.addRouters)
          // resetRouter()
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true })
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})

export default router
