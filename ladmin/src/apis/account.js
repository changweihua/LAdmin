import request from "./request"; //引入axios的封装方法

export const login = (params) => {
  console.log("login");
  return request('post', '/api/OAuth', params); //登陆管理员获取自身信息
};

export const values = (params) => {
  return request('get', '/api/values', params); //登陆管理员获取自身信息
};