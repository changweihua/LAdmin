import request from "./request"; //引入axios的封装方法

export const fetchConfigurationList = (params) => {
  return request('get', '/api/configurations/pager', params)
    // .then(response => {
    //   return response;
    // }).catch(err => {
    //   return err;
    // });
}

export const fetchConfiguration = (params) => {
  return request('get', '/api/configurations', params)
}

export const putConfiguration = (params) => {
  return request('put', '/api/configurations', params)
}

export const postConfiguration = (params) => {
  return request('post', '/api/configurations', params)
}
