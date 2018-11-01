// axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@store'

Vue.use(VueAxios, axios)

// 处理get方法的参数转换成url (待优化)
// TODO: 待优化
const stringify = function (url, params) {
  let temp = []
  for (var key in params) {
    if (params[key] instanceof Array) {
      temp.push(params[key].map(st => `${key}[]=${st}`).join('&'))
    } else {
      temp.push(`${key}=${params[key]}`)
    }
  }
  return url + temp.join('&')
}

Vue.prototype.$axios = axios

// 给所有请求头部加上token
axios.interceptors.request.use(
  config => {
    // 在所有请求头部添加token值
    const token = 'Token ' + store.state.userInfo.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export const http = (type, url, params = {}) => {
  switch (type) {
    case 'GET':
      return axios.get(stringify(url, params))

    case 'POST':
      return axios.post(url, params)

    case 'PATCH':
      return axios.patch(url, params)

    case 'DELETE':
      return axios.delete(url)

    default:
      throw new Error('未指明异步请求的请求方式！')
  }
}
