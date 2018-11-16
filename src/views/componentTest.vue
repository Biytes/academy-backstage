<template lang="html">
<div>
  <div>
    <file-uploader :syncFileList.sync="file"
                   ref="fileUploader"></file-uploader>
  </div>
  <div>
    <tags-editor :syncTags="tags"
                 ref="tagEditor"></tags-editor>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      file: [],
      tags: ['计算机科学与技术', '软件工程', '网络工程', '信息与计算科学']
    }
  },
  mounted () {
    this.$refs.tagEditor.initialData(this.tags, '')
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
