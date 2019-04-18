import request from "./request"; //引入axios的封装方法

export const fetchConfigurationList = (params) => {
  return request('get', '/api/configurations/pager', params);
    // .then(response => {
    //   return response;
    // }).catch(err => {
    //   return err;
    // });
};