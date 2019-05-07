import { fetchConfigurationList } from '@/apis/configuration'

const configurationModule = {
  state: {
    configurationList: [],
    pager: {}
  },
  mutations: {
    setList(state, rows) {
      state.configurationList = rows.slice()
    },
    setPager(state, pager) {
      state.pager = Object.assign({}, pager)
    }
  },
  actions: {
    fetchList({ commit }, query) {
      fetchConfigurationList(Object.assign({
          limit: 20,
          page: 1
        }, query))
        .then((res) => {
          commit('setList', res.pager.items)
          commit('setPager', res.pager)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

export { configurationModule }
