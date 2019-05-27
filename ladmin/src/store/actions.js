import { stat } from "fs";

const actions = {
  fetchProfile: ({ dispatch }, data) => {
    dispatch('fetchProfile', data)
  }
  // loadForms: ({ dispatch }, data) => {
  //   dispatch('LOAD_FORM_MODELS', data)
  // }
}

export default actions
  