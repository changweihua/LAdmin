import request from "./request"; //引入axios的封装方法

export const login = (params) => {
  console.log("login");
  return request('post', '/api/OAuth', params); //登陆管理员获取自身信息
};

export const auth = (params) => {
  console.log("auth");
  return request('post', '/api/OAuth/auth', params); //登陆管理员获取自身信息
};

export const values = (params) => {
  return request('get', '/api/values', params); //登陆管理员获取自身信息
};

export const fetchPermission = (params) => {
  return request('get', '/api/OAuth/GetPermissions', params); //登陆管理员获取自身信息
};

export const fetchProfile = (params) => {
  return request('post', '/api/OAuth/Profile', params); //登陆管理员获取自身信息
};