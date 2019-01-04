<template lang="html">
  <div class="page login">
    <div class="backstage-header">

      <div class="backstage-header-logo left">
        <img src="@img/logo/logo.png" alt="">
        <img src="@img/logo/学院.png" alt="">
      </div>

      <div class="backstage-header-menu-icon right">
        <i class="iconfont icon-down"></i>
        <i class="iconfont icon-accessibility"></i>
      </div>

    </div>
    <div class="login-container" v-loading="isLoading">
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
  </div>
</template>

<script>
import { checkAuth, editAcademyData } from '@api/index'
import { mapState, mapMutations } from 'vuex'
import { setStorageExpirable } from '@utils/index'

export default {
  data () {
    return {
      isLoading: false,
      username: 'jinhai',
      password: '123456',
      type: 0
    }
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    async loginSubmit () {
      this.isLoading = true
      let params = {
        username: this.username,
        password: this.password,
        type: this.type
      }
      try {
        let tokenInfo = await checkAuth(params)
        tokenInfo = tokenInfo.data // 把数据取出来
        this.saveToken(tokenInfo.token)
        let userInfo
        // 存储信息

        // 区分学生和其他账号的存储
        if (tokenInfo.user.type === 2) {
          try {
            this.isLoading = true
            let studentInfo = await editAcademyData('student', tokenInfo.user.id)
            userInfo = {
              id: tokenInfo.user.id,
              type: tokenInfo.user.type,
              token: tokenInfo.token,
              user_permissions: tokenInfo.user.user_permissions,
              grade: studentInfo.data.grade,
              major: studentInfo.data.major,
              stu_class: studentInfo.data.stu_class
            }
          } catch (e) {
            console.log(e)
            this.$message.error('用户信息获取失败')
          } finally {
          }
        } else {
          userInfo = {
            id: tokenInfo.user.id,
            type: tokenInfo.user.type,
            token: tokenInfo.token,
            user_permissions: tokenInfo.user.user_permissions
          }
        }
        // 从这里开始所有的数据都被整合到userInfo里
        setStorageExpirable('userInfo', JSON.stringify(userInfo), 200 * 60 * 1000)
        this.saveUserInfo(userInfo)
        this.login()

        this.$message.success('登陆成功')

        localStorage.setItem('isFirstTimeLogin', 1)

        let path = userInfo.type === 2 ? '/certificate' : '/studentnews/condition'

        this.$router.push({ path })
      } catch (e) {
        console.log(e)
        this.$message.error('用户信息不正确')
      } finally {
        this.isLoading = false
      }
    },
    ...mapMutations([
      'login',
      'saveUserInfo',
      'saveToken'
    ])
  }
}

</script>

<style lang="scss" scoped>

.page.login {
  .login-container{
    width:400px;
    margin: auto;
    margin-top: 100px;
    color: #000;

    .el-radio-group {
      margin-left: 60px;
    }
  }
  .backstage-header {
    width:calc(100%-(30px));
    height:100px;
    background: #222222;
    padding:0 15px;
    position: relative;
    &-menu-icon {
      height:100%;
      width:130px;
      right: 20px;
      line-height: 1.5;
      i {
        color:#777;
        &:last-child {
          padding:15px 15px 15px 0px;
          font-size: 65px;
        }
      }
    }

    &-menu-icon:hover,
    &-menu-icon--active {
      background-color: #080808;
      i {
        color:#fff;
      }
    }

    &-logo {
      padding:5px 0 0px;
      width:180px;
      margin-left: 5px;
      img {
        float:left;
        width:163.863px;
        height:47.8px;
      }
    }
  }

  @media (min-width: 1200px) and (max-width: 1366px) {
    .login-container {
      width: 300px;

      .el-radio-group {
        margin-left: 30px;
      }

      .customInput {
        margin: 5px 0 30px;
      }
    }
    .backstage-header {
      height:75px;
      &-logo {
        img {
          height: 35.85px;
          width: 122.89725px;
        }
      }

      &-menu-icon {
        width:100px;

        i:last-child {
          padding: 15px 0 15px 0;
          font-size: 48px;
        }
      }
    }
  }
}
</style>
