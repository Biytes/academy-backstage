<template>
  <div id="editor" style="text-align:left" ref="wangEditor">
    <p></p>
  </div>
</template>

<script>

import E from 'wangeditor'
export default {
  name: 'wang-editor',
  props: [],
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {

  },
  mounted () {
    var editor = new E(this.$refs.wangEditor)

    editor.customConfig.showLinkImg = false
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.customConfig.zIndex = 1
    editor.customConfig.uploadFileName = 'pic'
    editor.customConfig.uploadImgServer = 'https://schooltest.zunway.pw/api/v1/image'
    editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function (xhr, editor, result) {
        alert('fail')
      },
      error: function (xhr, editor) {
        alert('error')
        alert(xhr)
      },
      timeout: function (xhr, editor) {
        alert('time out')
      },
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        var url = result.url
        insertImg(url)
      }
    }
    editor.create()
  }
}
</script>

<style lang="scss">

</style>
