import $ from 'jquery'
// polyfill
import 'babel-polyfill'
import Promise from 'es6-promise'

// 使 IE 支持 Promise
if (!window.Promise) {
  Promise.polyfill()
}

// jquery
window.$ = $
window.jQuery = $
export default $
