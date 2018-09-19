import Vue from 'vue'
import App from '@/App'
import router from '@/router'

import store from '@/store'

require('./bootstrap')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
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
