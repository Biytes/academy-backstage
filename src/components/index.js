/**
 *
 * 组件命名规则：
 *
 * 1. 文件夹使用 kebab-case，建议两个单词以内
 * 2. 文件名一律 index.vue
 *
 */

import Vue from 'vue'
// import CbIconfont from './iconfont'

const components = [
  // CbIconfont,
]

// 注册组件
components.forEach(item => {
  Vue.component(item.name, item)
})
