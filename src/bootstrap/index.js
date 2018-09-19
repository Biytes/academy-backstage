import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// polyfill
import 'babel-polyfill'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'

// jquery
window.$ = $
window.jQuery = $
export default $

// ElementUI
Vue.use(ElementUI)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
