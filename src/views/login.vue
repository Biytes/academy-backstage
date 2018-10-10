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
import { getTestData } from '@api/index'
export default {
  data () {
    return {
      labelPosition: 'left',
      formData: {
        username: '',
        password: '',
        type: '老师'
      },
      users: '',
      userVerification: true
    }
  },
  async mounted () {
    // let res = await getTestData()
    // this.users = res.data.data
    getTestData().then(res => {
      this.users = res.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  computed: {
    Users () {
      return this.$store.state.testData.Users
    }
  },
  methods: {
    loginSubmit () {
      let formData = this.formData

      // 判断用户选的类型 不是老师就行学生
      this.$store.state.clientType = formData.type === '老师' ? 1 : 0

      let clientType = this.$store.state.clientType

      // 根据账户类型来判断push到哪个地址
      let path = clientType ? '/schoolInfo/about' : '/certificate'

      // 筛选出账号密码和类型相符的账号
      let result = this.Users.filter(item => formData.username === item.username && formData.password === item.password && clientType === item.clientType)

      if (result.length) {
        // 匹配到符合的账号
        this.$router.push({ path: path })
        this.$store.state.menu = true
        this.$store.state.status = true
      } else {
        // 没有匹配到符合的账号
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
