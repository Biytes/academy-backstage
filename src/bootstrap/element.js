import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 Element-UI
Vue.use(ElementUI)

// 将自定义 alert 成员绑定到 Vue 原型链上
Vue.prototype.$alert.success = (msg, params) => Vue.prototype.$alert(msg, '成功', Object.assign({
  type: 'success'
}, params))

Vue.prototype.$alert.info = (msg, params) => Vue.prototype.$alert(msg, '信息', Object.assign({
  type: 'info'
}, params))

Vue.prototype.$alert.warning = (msg, params) => Vue.prototype.$alert(msg, '警告', Object.assign({
  type: 'warning'
}, params))

Vue.prototype.$alert.error = (msg, params) => Vue.prototype.$alert(msg, '错误', Object.assign({
  type: 'error'
}, params))
