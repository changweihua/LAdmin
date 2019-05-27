import { fetchRoleList } from '@/apis/role'

const roleModule = {
  state: {
    roleList: [],
    rolePager: {}
  },
  mutations: {
    setRoleList(state, rows) {
      state.roleList = rows.slice()
    },
    setRolePager(state, pager) {
      state.rolePager = Object.assign({}, pager)
    }
  },
  actions: {
    fetchRoleList({ commit }, query) {
      fetchRoleList(Object.assign({
        limit: 20,
        page: 1
      }, query))
      .then((res) => {
        commit('setRoleList', res.pager.items)
        commit('setRolePager', res.pager)
      })
       .catch((err) => {
        console.log(err)
      })
    }
  }
}

export { roleModule }
