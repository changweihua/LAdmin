import request from "./request" //引入axios的封装方法

export const fetchForms = (params) => {
  return request('get', '/api/system/forms', params)
}