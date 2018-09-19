<template lang="html">
  <div class="img-page" v-show="imgPage">
    <img :src="currentImg" alt="">
    <div class="block" @click="hideImgPage()"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    currentImg () {
      return this.$store.state.testData.currentImg
    },
    imgPage () {
      return this.$store.state.testData.imgPage
    }
  },
  methods: {
    hideImgPage () {
      this.$store.state.testData.imgPage = false
    }
  }
}
</script>

<style lang="css">
.img-page{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(28, 27, 27, 0.77);
  z-index: 10
}
.img-page img{
  right: 520px;
  width:450px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
}
.img-page .block{
  z-index: -1;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
