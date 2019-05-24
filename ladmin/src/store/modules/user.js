import { fetchUserProfile } from '@/apis/user'

const userModule = {
  state: {
    profile: {},
    pager: {}
  },
  mutations: {
    setList(state, rows) {
      state.configurationList = rows.slice()
    },
    setPager(state, pager) {
      state.pager = Object.assign({}, pager)
    },
    setProfile(state, profile) {
      state.profile = Object.assign({}, profile)
    }
  },
  actions: {
    fetchProfile({ commit }, query) {
        fetchUserProfile(Object.assign({ }, query))
          .then((res) => {
            console.log(res)
            commit('setProfile', res.pager)
          })
          .catch((err) => {
            console.log(err)
          })
      }
  }
}

export { userModule }
