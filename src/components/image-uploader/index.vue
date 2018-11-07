<template lang="html">
  <div class="image-uploader" v-loading="isLoading">
    <label for="imageUrl" class="image-upload" :style="style"><img id="showImage" :src="imageUrl" alt="" :style="style"></label>
    <input id="imageUrl" @change="changePic" type="file" accept="image/png, image/gif, image/jpeg, image/jpg" ref="upload_pic" />
  </div>
</template>

<script>

export default {
  name: 'image-uploader',
  props: {
    width: {
      type: String,
      default: '300'
    },
    height: {
      type: String,
      default: '300'
    }
  },
  data () {
    return {
      size: '',
      imageUrl: '',
      isLoading: false
    }
  },
  computed: {
    style () {
      return `width: ${this.width}px;height: ${this.height}px;`
    }
  },
  mounted () {
  },
  methods: {
    changePic (e) {
      console.log(e)
      // 获取img blob 格式 URL
      this.isLoading = true
      var file = e.target.files[0] // 也可以用下面的形式/
      // var file = this.$refs['certicification_pic'].files[0]

      let params = new FormData()
      params.append('image', file)

      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }

      this.axios.post('/api/image', params, config)
        .then(res => {
          console.log(res)
          this.imageUrl = res.data.image
          this.$emit('update:syncImage', res.data.image)
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss">
.image-uploader {
  display: inline-block;

  input[type="file"]#imageUrl {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
  }

  #showImage {
    display: inline-block;
    vertical-align: bottom;
  }

  .image-upload {
    display: inline-block;
    border:2px dashed grey;
    color: grey;
    vertical-align: bottom;
    position: relative;
    cursor: pointer;

    &:after {
      content: '+';
      position: absolute;
      font-size: 2.5rem;
      color: grey;
      top: calc(50% - 1.7rem);
      left: calc(50% - 1.25rem);
      z-index: 1;
    }

    &:hover {
      border:2px dashed #000;
      color: #000;
    }
  }
}

</style>
