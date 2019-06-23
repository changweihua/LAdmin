import { auth, fetchProfile } from '@/apis/account'

const oauthModule = {
  state: {
    JWT_ACCESS_TOKEN: '',
    JWT_REFRESH_TOKEN: '',
    CURRENT_USER: null,
    CURRENT_PERMISSIONS: []
  },
  mutations: {
    SET_JWT_TOKEN(state, jwt) {
      if (jwt) {
        state.JWT_ACCESS_TOKEN = jwt.access_token
        // state.JWT_REFRESH_TOKEN = jwt.refresh_token
      } else {
        state.JWT_ACCESS_TOKEN = ''
        state.JWT_REFRESH_TOKEN = ''
      }
    },
    SET_CURRENT_USER(state, user) {
      state.CURRENT_USER = user
    },
    SET_CURRENT_PERMISSIONS(state, permissions) {
      state.CURRENT_PERMISSIONS = permissions
    }
  },
  actions: {
    JWT_OAUTH({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        auth(loginInfo)
          .then(res => {
            commit('SET_JWT_TOKEN', {
              access_token: res.access_token,
              refresh_token: res.refresh_token
            })
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    FETCH_PROFILE({ commit }, query) {
      return new Promise((resolve, reject) => {
        fetchProfile(Object.assign({ }, query))
          .then((res) => {
            console.log(res)
            commit('SET_CURRENT_USER', res.result)
            commit('SET_CURRENT_PERMISSIONS', res.result.permissions)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
  
export { oauthModule }