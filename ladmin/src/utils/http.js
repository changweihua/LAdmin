import axios from 'axios'
// import qs from 'qs'
// import md5 from 'js-md5'

/**
 * Get 方法
 * @param {*} url
 * @param {*} params
 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * POST 方法
 * @param {*} url
 * @param {*} data
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * PATCH 方法封装
 * @param {*} url
 * @param {*} data
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * PUT 方法
 * @param {*} url
 * @param {*} data
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * ALL 方法
 * @param {*} url
 * @param {*} data
 */
export function all(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
