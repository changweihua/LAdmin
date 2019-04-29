const getters = {
  currentUser: state => state.CURRENT_USER,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  sideRouters: state => state.permission.routers.filter(r => {
    return !r.meta || !r.meta.hidden
  }),
  token: state => state.JWT_TOKEN,
  routerLoadDone: state => state.permission.routerLoadDone,
  showCrumb: state => state.CRUMB_VISIBILITY
}

export default getters
  