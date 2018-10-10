import Vue from 'vue'

import router from '@router'

import store from '@store'

import App from '@/App'

require('@api/axios')

require('@mock')

require('@components')

Vue.config.productionTip = false

window.app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App></App>'
})
