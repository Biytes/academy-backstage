<template lang="html">
  <div class="login-container">
    <customInput type="text"
                  label="username"
                  pattern="gate"
                  placeholder="Input your Username"
                  v-model="username"
                  @keyup.enter.native="loginSubmit"
                  focus="true"></customInput>
    <customInput type="password"
                  label="password"
                  pattern="gate"
                  placeholder="Input your Password"
                  @keyup.enter.native="loginSubmit"
                  v-model="password"></customInput>
    <el-button type="success" @click="loginSubmit">登陆</el-button>
    <el-radio-group v-model="type">
      <el-radio-button label="1">老师</el-radio-button>
      <el-radio-button label="2">学生</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { checkAuth } from '@api/index'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      username: 'jinhai',
      password: 'helloworld123456',
      type: '0'
    }
  },
  mounted () {
    // TODO: 解决back到login页面清除状态
    // this.logout() 
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    async loginSubmit () {
      let params = {
        username: this.username,
        password: this.password,
        type: this.type
      }

      checkAuth(params)
        .then(res => {
          res = res.data // 把数据取出来

          let userInfo = {
            token: res.token,
            type: res.type
          }
          // 存储信息
          this.saveUserInfo(userInfo)

          this.login()

          let path = res.type === '2' ? '/certificate' : '/schoolInfo/about'

          this.$router.push({ path: path })
        })
        .catch(_ => {
          this.$message({
            type: 'error',
            message: '用户信息不正确'
          })
        })
    },
    ...mapMutations([
      'login',
      'saveUserInfo',
      'logout'
    ])
  }
}

</script>

<style lang="css">
.login-container{
  width:400px;
  margin: auto;
  margin-top: 100px;
  color: #000;
}
.login-container .el-form--label-left .el-form-item__label{
  color:#000;
  font-size: 18px;
}
.login-container .el-form-item__content{
  border-radius: 5px;
  border: 1px solid #333;
}
.login-container .el-radio-group{
  margin-left: 56px;
}
@media (min-width: 1200px) and (max-width: 1366px) {
  .container{
    width: calc(100% - 200px)
  }
}
</style>
