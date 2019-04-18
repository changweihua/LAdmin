import { fetchConfigurationList } from "@/apis/configuration";

const configurationModule = {
  state: {
    configurationList: [],
  },
  mutations: {
    setList(state, rows) {
      console.log(rows);
      state.configurationList = rows.slice();
      console.log(state);
    }
  },
  actions: {
    fetchList({ commit }, query) {
      fetchConfigurationList({
        limit: 20,
        page: 1
      }).then(res => {
        console.log("then");
        console.log(res);
        commit('setList', res.pager.items);
      }).catch(err => {
        console.log("catch");
        console.log(err);
      });
    }
  }
};

export { configurationModule } ;
