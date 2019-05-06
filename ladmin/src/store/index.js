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
import getters from '@/store/getters'

const debug = process.env.NODE_ENV !== 'production'
const createPersisted = persistedState({
  storage: window.sessionStorage
})

const store = new Vuex.Store({
  // namespace: true,
  state: {
    CURRENT_USER: {},
    JWT_TOKEN: '',
    CRUMB_VISIBILITY: true,
    FORM_MODELS: []
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.CURRENT_USER = user
    },
    SET_JWT_TOKEN(state, token) {
      state.JWT_TOKEN = token
    },
    SET_CRUMB_VISIBILITY(state, visible) {
      state.CRUMB_VISIBILITY = visible
    },
    SET_FORM_MODELS(state, formModels) {
      state.FORM_MODELS = formModels
    }
  },
  actions: {},
  getters: getters,
  modules: {
    permission: permissionModule,
    configuration: configurationModule,
    i18n: i18nVuex.store
  },
  plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
  // vuexCache({ timeout: 2000 })
})

export default store
