import { stat } from "fs";

const getters = {
  currentUser: state => state.CURRENT_USER,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  sideRouters: state => state.permission.routers.filter(r => {
    return !r.meta || !r.meta.hidden
  }),
  token: state => state.JWT_TOKEN,
  routerLoadDone: state => state.permission.routerLoadDone,
  showCrumb: state => state.CRUMB_VISIBILITY,
  formModels: state => state.FORM_MODELS,
  systemModules: state => state.system.SYSTEM_MODULES.map(modul => {
    return {
      name: modul.name,
      label: modul.displayName,
      // disabled: true,
      children: modul.actions.map(action => {
        return {
          name: modul.name + '.' + action.name,
          label: action.displayName
        }
      })
    }
  }),
  userProfile: state => state.JWT_TOKEN ? JSON.parse(window.atob(state.JWT_TOKEN.split('.')[1])) : {}
}

export default getters
