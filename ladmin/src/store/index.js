import Vue from 'vue'
import Vuex from 'vuex'
// import vuexCache from 'vuex-cache'
import persistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
import i18nVuex from 'i18n-vuex'
// import * as Cookies from 'js-cookie';

Vue.use(Vuex)

import { permissionModule } from '@/store/modules/permission'
import { configurationModule } from '@/store/modules/configuration'
import { userModule } from '@/store/modules/user'
import { roleModule } from '@/store/modules/role'
import { systemModule } from '@/store/modules/system'
import { oauthModule } from '@/store/modules/oauth'
import getters from '@/store/getters'
import actions from '@/store/actions'

const debug = process.env.NODE_ENV !== 'production'
const createPersisted = persistedState({
  storage: window.sessionStorage
  // reducer(state, paths) {
  //   console.log(state)
  //   console.log(paths)
  //   delete state.permission.routerLoadDone
  //   return state
  // }
})

const store = new Vuex.Store({
  // namespace: true,
  state: {
    CRUMB_VISIBILITY: true,
    IS_AJAX_REQUESTING: false
  },
  mutations: {
    SET_CRUMB_VISIBILITY(state, visible) {
      state.CRUMB_VISIBILITY = visible
    }
  },
  actions: actions,
  getters: getters,
  modules: {
    permission: permissionModule,
    configuration: configurationModule,
    system: systemModule,
    user: userModule,
    role: roleModule,
    oauth: oauthModule,
    i18n: i18nVuex.store
  },
  plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
  // vuexCache({ timeout: 2000 })
})

export default store
