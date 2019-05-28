import { fetchForms, fetchModules } from '@/apis/system'

const systemModule = {
  state: {
    FORM_MODELS: [],
    SYSTEM_MODULES: []
  },
  mutations: {
    SET_FORM_MODELS(state, formModels) {
      state.FORM_MODELS = formModels
    },
    SET_SYSTEM_MODULES(state, modules) {
      state.SYSTEM_MODULES = modules
    }
  },
  actions: {
    LOAD_FORM_MODELS({ commit }, query) {
      fetchForms(query)
        .then((res) => {
          console.log(res)
          commit('SET_FORM_MODELS', res.entity)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    LOAD_SYSTEM_MODULES({ commit }, query) {
      fetchModules(query)
        .then((res) => {
          console.log(res)
          commit('SET_SYSTEM_MODULES', res.entity)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

export { systemModule }
