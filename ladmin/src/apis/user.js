import request from "./request"; //引入axios的封装方法

export const userList = (params) => {
  return request('get', '/api/users', params); //登陆管理员获取自身信息
};