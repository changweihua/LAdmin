import request from "./request"; //引入axios的封装方法

export const fetchUserList = (params) => {
  return request('get', '/api/users/pager', params); //登陆管理员获取自身信息
}

export const fetchUserProfile = (params) => {
  return request('get', '/api/users', params); //登陆管理员获取自身信息
}

export const postUser = (params) => {
  return request('post', '/api/users', params)
}

export const fetchUser = (params) => {
  return request('get', '/api/users', params)
}

export const putUser = (params) => {
  return request('put', '/api/users', params)
}
