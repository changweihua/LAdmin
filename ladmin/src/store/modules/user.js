import { fetchUserProfile, fetchUserList } from '@/apis/user'

const userModule = {
  state: {
    profile: {},
    userPager: {},
    userList: []
  },
  mutations: {
    setUserList(state, rows) {
      state.userList = rows.slice()
    },
    setUserPager(state, pager) {
      state.userPager = Object.assign({}, pager)
    },
    setProfile(state, profile) {
      state.profile = Object.assign({}, profile)
    }
  },
  actions: {
    fetchProfile({ commit }, query) {
      return new Promise((resolve, reject) => {
        fetchUserProfile(Object.assign({ }, query))
          .then((res) => {
            commit('setProfile', res.pager)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchUserList({ commit }, query) {
      fetchUserList(Object.assign({
        limit: 20,
        page: 1
      }, query))
        .then((res) => {
          commit('setUserList', res.pager.items)
          commit('setUserPager', res.pager)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

export { userModule }
