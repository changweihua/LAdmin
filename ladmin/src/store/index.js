import Vue from "vue";
import Vuex from "vuex";
import vuexCache from "vuex-cache";
import persistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";

Vue.use(Vuex);

import { _PERMISSION } from '@/store/permission';

export default new Vuex.Store({
  state: {
    CURRENT_USER: {}
  },
  mutations: {
    SET_CURRENT_USER (state, user) {
      state.CURRENT_USER = user;
    }
  },
  actions: {},
  modules: {
    permission: _PERMISSION
  },
  plugins: [
    persistedState({
      // storage: {
      //   getItem: key => Cookies.get(key),
      //   // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      //   setItem: (key, value) => {
      //     Cookies.set(key, value, { expires: 3, secure: true });
      //   },
      //   removeItem: key => Cookies.remove(key)
      // },
      storage: window.sessionStorage
    }),
    vuexCache({ timeout: 2000 })
  ]
});
