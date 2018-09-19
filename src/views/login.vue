<template lang="html">
  <div class="login-container">
    <el-form :label-position="labelPosition" label-width="80px" :model="formData">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"  @keyup.enter.native="loginSubmit"></el-input>
      </el-form-item>
      <el-button type="success" @click="loginSubmit">登陆</el-button>
      <el-radio-group v-model="formData.type">
        <el-radio-button label="老师"></el-radio-button>
        <el-radio-button label="学生"></el-radio-button>
      </el-radio-group>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'left',
      formData: {
        username: '',
        password: '',
        type: '老师'
      },
      userVerification: true
    }
  },
  computed: {
    Users () {
      return this.$store.state.testData.Users
    }
  },
  methods: {
    loginSubmit () {
      if (this.formData.type === '老师') {
        this.$store.state.clientType = 1
      } else if (this.formData.type === '学生') {
        this.$store.state.clientType = 0
      }
      for (var i in this.Users) {
        if (this.formData.username === this.Users[i].username) {
          this.userVerification = true
          console.log(1)
          if (this.formData.password === this.Users[i].password) {
            this.userVerification = true
            console.log(2)
            if (this.$store.state.clientType === this.Users[i].clientType) {
              this.userVerification = true
              console.log(3)
              if (this.Users[i].clientType === 1) {
                this.$router.push({ path: '/schoolInfo/about' })
              } else if (this.Users[i].clientType === 0) {
                this.$router.push({ path: '/shelf' })
              }
              this.$store.state.menu = true
              this.$store.state.status = true
              break
            } else {
              console.log(4)
              this.userVerification = false
            }
          } else {
            console.log(5)
            this.userVerification = false
          }
        } else {
          console.log(6)
          this.userVerification = false
        }
      }
      if (!this.userVerification) {
        this.$message({
          type: 'error',
          message: '用户信息错误'
        })
        this.formData.username = ''
        this.formData.password = ''
      }
    }
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
