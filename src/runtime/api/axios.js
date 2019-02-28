// axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@store'
import router from '@router'

Vue.use(VueAxios, axios)

// var service=axios.create({
//   baseURL:process.env.BASE_API,
//   timeout:5000
// })

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

  // if(store.getters.token){
  //     config.headers['TOKEN']=getCookie('TOKEN')
  // }
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

export const http = (type, url, params = {}) => Promise
  .resolve()
  .then(_ => {
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
  })

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    // 对响应错误做点什么
    let errorMsg
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          errorMsg = '请求错误(400)'
          break
        case 401:
          errorMsg = '未授权，请重新登录(401)'
          router.push('/login')
          break
        case 403:
          errorMsg = '没有权限访问(403)'
          break
        case 404:
          errorMsg = '请求地址出错(404)'
          break
        case 500:
          errorMsg = '服务器错误(500)'
          break
        case 502:
          errorMsg = '网关错误(502)'
          break
        case 503:
          errorMsg = '服务不可用(503)'
          break
        case 504:
          errorMsg = '网关超时(504)'
          break
        case 505:
          errorMsg = 'HTTP版本不受支持(505)'
          break
      }

      return Promise.reject(errorMsg)
    } else {
      errorMsg = '网络开小差~'
    }

    return Promise.reject(error.response.data)
  }
)
