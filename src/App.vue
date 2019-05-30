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
      isFirstTimeLogin: ''
    }
  },
  mounted () {
    // 如果为undefined就是第一次登陆
    this.isFirstTimeLogin = localStorage.getItem('isBackstageFirstTimeLogin')

    // 如果是第一次登陆就不验证
    if (this.isFirstTimeLogin === '1') {
      this.checkTokenValid()
    }
  },
  methods: {
    // 确保token是否有效，如果无效就回到登陆界面，如果有效就执行登陆
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
        this.$router.push({ path })
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
