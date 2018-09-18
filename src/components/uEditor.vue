<template lang="html">
  <div>
    <el-row>
      <el-row :gutter="20" class="m-t">
        <el-col :span="18" :offset="3">
          <div class="grid-content">
            <script id="editor" type="text/plain">

            </script>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      input: '',
      msg: 'Welcome to your Vue.js App',
      editor: null
    }
  },
  mounted () {
    this.editor = UE.getEditor('editor')
  },
  destroyed () {
    this.editor.destroy()
  },
  methods: {
    getUeditorContent: () => {
      console.log(this.editor.getContent())
    }
  }
}
</script>

<style lang="css">
</style>
