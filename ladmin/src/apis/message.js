import request from "./request"; //引入axios的封装方法

export const send = (params) => {
  return request('post', '/api/messages', params); //登陆管理员获取自身信息
};