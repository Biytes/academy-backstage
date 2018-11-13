<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getStorageExpirable } from '@utils/index'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    this.checkTokenValid()
  },
  methods: {
    checkTokenValid () {
      let userInfo = getStorageExpirable('userInfo')
      userInfo = JSON.parse(userInfo)
      if (userInfo) {
        Promise
          .resolve()
          .then(_ => this.saveUserInfo(userInfo))
          .then(_ => this.login())
      } else {
        this.$message.warning('token 过期')
        let path = '/'
        this.$router.push({ path, replace: true })
      }
    },
    ...mapMutations([
      'login',
      'saveUserInfo'
    ])
  }
}
</script>

<style lang="scss">
@import '@css/topBar.scss';
@import '@css/global.scss';

body{
  padding:0;
  margin:0;
  overflow: hidden;
}
#app {
  font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
</style>
