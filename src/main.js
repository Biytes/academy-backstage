// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon/iconfont.css'

import $ from './assets/jquery-vender'

// uEditor
import '@static/plugins/utf8-jsp/ueditor.config.js'
import '@static/plugins/utf8-jsp/ueditor.all.min.js'
import '@static/plugins/utf8-jsp/lang/zh-cn/zh-cn.js'
import '@static/plugins/utf8-jsp/ueditor.parse.min.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store: store,
  template: '<App></App>'
})

$(document).ready(function () {
  $('.second-nav-menu-right ul li').on('mouseover', function () {
    let hoverText = $(this).find('p').text()
    $('.second-nav-menu-left p').text(hoverText)
    if (event.stopPropagation) {
      // 针对 Mozilla 和 Opera
      event.stopPropagation()
    } else if (window.event) {
      // 针对 IE
      window.event.cancelBubble = true
    }
  })
  $('.footer-bottom-right ul li').on('click', function () {
    $('.footer-bottom-right ul li').children('i').removeClass('icon-transform')
    $(this).children('i').addClass('icon-transform')
    $('.footer-bottom-right ul li').children('.select-form').hide()
    $(this).children('.select-form').show()
    if (event.stopPropagation) {
      // 针对 Mozilla 和 Opera
      event.stopPropagation()
    } else if (window.event) {
      // 针对 IE
      window.event.cancelBubble = true
    }
  })
  $(window).on('click', function () {
    $('.footer-bottom-right ul li').children('.select-form').hide()
    if (event.stopPropagation) {
      // 针对 Mozilla 和 Opera
      event.stopPropagation()
    } else if (window.event) {
      // 针对 IE
      window.event.cancelBubble = true
    }
  })
})
