/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import store from '@/store'
import { constantRouterMap } from '@/router/constantRouterMap'

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

var isRouterGenerated = false
var isChanged = false

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  console.log(store.getters.addRouters)
  console.log(to)
  // 判断是否需要登录权限
  if (to.matched.length === 0 || to.matched.some((res) => res.meta.requireLogin)) {
    let lifeTime = new Date().getTime() * 1000
    // 当前时间的时间戳
    let nowTime = new Date().getTime()
    // 用户未登录
    if (!store.getters.currentUser || store.getters.token === '' || nowTime > lifeTime) {
      // 判断是否登录
      // JSON.parse(window.localStorage.getItem('JWT_TOKEN')).lifeTime
      // eslint-disable-next-line new-cap
      Message({
        showClose: true,
        message: '登录状态信息过期,请重新登录',
        type: 'error'
      })

      next({
        path: '/login'
      })
      // eslint-disable-next-line callback-return
      // 没登录则跳转到登录界面
      // next({
      //   path: '/login'
      // })
      // store
      //   .dispatch('generateRoutes', [])
      //   .then(() => {
      //     // store.getters.addRouters
      //     // 动态添加可访问路由表
      //     console.log(store.getters.addRouters)
      //     router.addRoutes(store.getters.addRouters)
      //     // router.addRoutes({ path: '*', redirect: '/404', hidden: true })
      //     // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //     // eslint-disable-next-line new-cap
      //     next({ ...to, replace: true })
      //   })
    } else {
      // Message({
      //   showClose: true,
      //   message: '登录',
      //   type: 'error'
      // })
      // 路由是否加载完成标识
      // if (!store.getters.routerLoadDone) {
      console.log(isRouterGenerated)
     
      if (!isRouterGenerated) {
        if (store.getters.addRouters.length > 0) {
          store
            .dispatch('generateRoutes', [])
            .then(() => {
              // store.getters.addRouters
              // 动态添加可访问路由表
              console.log(store.getters.addRouters)
              router.addRoutes(store.getters.routers)
              // router.addRoutes(store.getters.addRouters.concat({ path: '*', redirect: '/404', hidden: true }))
              isRouterGenerated = true
              isChanged = true
              // router.addRoutes({ path: '*', redirect: '/404', hidden: true })
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              // eslint-disable-next-line new-cap
              next({ ...to, replace: true })
            })
          console.log('load from local')
          // router.addRoutes(store.getters.addRouters)
          // // router.addRoutes({ path: '*', redirect: '/404', hidden: true })
          // isRouterGenerated = true
          // isChanged = true
          // // next()
          // next({ ...to, replace: true })
          // next({
          //   path: to.path
          // })
        } else {
          store
            .dispatch('generateRoutes', [])
            .then(() => {
              // store.getters.addRouters
              // 动态添加可访问路由表
              console.log(store.getters.addRouters)
              router.addRoutes(store.getters.addRouters.concat({ path: '*', redirect: '/404', hidden: true }))
              isRouterGenerated = true
              isChanged = true
              // router.addRoutes({ path: '*', redirect: '/404', hidden: true })
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              // eslint-disable-next-line new-cap
              next({ ...to, replace: true })
            })
          // next()
        }
        // next({ ...to, replace: true })
      } else {
        console.log('isChanged'+isChanged)
        // next()
        if (isChanged) {
          isChanged = false
          next({ ...to, replace: true })
        } else {
          next()
        }
      }
    }
  } else {
    if (to.matched.length === 0) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})

// 取到浏览器出现网址的最后"/"出现的后边的字符
function getLastUrl(str, yourStr) {
  str.slice(str.indexOf(yourStr) + 1)
}

export default router
