import request from "./request"; //引入axios的封装方法

export const query = (params) => {
  return request('get', '/api/values/query', params); //登陆管理员获取自身信息
}

export const create = (params) => {
  return request('post', '/api/values', params); //登陆管理员获取自身信息
}
