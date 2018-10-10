// axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const stringify = function (url, params) {
  url += '?'
  for (var i in params) {
    url += `${i}=${params[i]}&`
  }
  return url.slice(0, url.length - 1)
}

Vue.prototype.$axios = axios

const get = (url, params) => {
  url = params ? stringify(url, params) : url
  return axios.get(url)
}

const post = (url, params) => {
  return axios.post(url, params)
}

export { get, post }
