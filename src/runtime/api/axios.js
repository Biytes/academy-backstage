// axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// 处理get方法的参数转换成url (待优化)
const stringify = function (url, params) {
  for (var i in params) {
    url += `${i}=${params[i]}&`
  }
  return url.slice(0, url.length - 1)
}

Vue.prototype.$axios = axios

const get = (url, params = []) => axios.get(stringify(url, params))

const post = (url, params) => axios.post(url, params)

const patch = (url, params) => axios.patch(url, params)

const remove = url => axios.delete(url)

export { get, post, patch, remove }
