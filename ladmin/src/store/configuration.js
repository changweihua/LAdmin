import { fetchConfigurationList } from '@/apis/configuration'

const configurationModule = {
  state: {
    configurationList: []
  },
  mutations: {
    setList(state, rows) {
      state.configurationList = rows.slice()
    }
  },
  actions: {
    fetchList({ commit }, query) {
      console.log(query)
      fetchConfigurationList({
        limit: 20,
        page: 1
      })
        .then((res) => {
          commit('setList', res.pager.items)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

export { configurationModule }
