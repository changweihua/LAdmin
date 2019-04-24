const getters = {
  currentUser: state => state.CURRENT_USER,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  sideRouters: state => state.permission.routers.filter(r => {
    console.log(r.meta.hidden)
    return !r.meta.hidden
  }),
  token: state => state.JWT_TOKEN,
  routerLoadDone: state => state.permission.routerLoadDone
}

export default getters
  