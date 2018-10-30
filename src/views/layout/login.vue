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
  </div>
</template>

<script>
import { checkAuth } from '@api/index'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      username: 'jinhai',
      password: '123456',
      type: '0'
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

          let path = res.type === '2' ? '/certificate' : '/collegeIntro/about'

          this.$router.push({ path: path })
        })
        .catch(_ => {
          console.log(_)
          this.$message({
            type: 'error',
            message: '用户信息不正确'
          })
        })
    },
    ...mapMutations([
      'login',
      'saveUserInfo',
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
