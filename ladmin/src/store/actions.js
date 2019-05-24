import { stat } from "fs";

const actions = {
  fetchProfile: ({ dispatch }, data) => {
    dispatch('fetchProfile', data)
  }
}

export default actions
  