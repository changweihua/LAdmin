import { fetchForms } from '@/apis/system'

const systemModule = {
  state: {
    FORM_MODELS: []
  },
  mutations: {
    SET_FORM_MODELS(state, formModels) {
      state.FORM_MODELS = formModels
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
    }
  }
}

export { systemModule }
