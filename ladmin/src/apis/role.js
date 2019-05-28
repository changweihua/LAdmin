import request from './request'

export const fetchRoleList = (params) => {
  return request('get', '/api/roles/pager', params)
}

// export const fetchConfiguration = (params) => {
//   return request('get', '/api/configurations', params)
// }

// export const putConfiguration = (params) => {
//   return request('put', '/api/configurations', params)
// }

export const postRole = (params) => {
  return request('post', '/api/roles', params)
}

export const assignRole = (params) => {
  return request('post', '/api/roles/assign', params)
}
