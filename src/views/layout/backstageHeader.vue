<template lang="html">
  <div class="backstage-header">

    <div class="backstage-header-logo left">
      <img src="@img/logo/logo.png" alt="">
      <img src="@img/logo/学院.png" alt="">
    </div>

    <div class="backstage-header-menu-icon right pointer" :class="{ 'backstage-header-menu-icon--active' : isShowHeaderSubMenu }" @click.stop="toggleShowSubMenu">
      <i class="iconfont icon-down"></i>
      <i class="iconfont icon-accessibility"></i>
    </div>

    <!-- <div class="backstage-header-search right">
      <customInput type="text"
                   label="Search"
                   pattern="clean"
                   placeholder="Search Something ...">
                   </customInput>
    </div> -->

    <ul class="backstage-header-dropdown-menu" v-show="isShowHeaderSubMenu">
      <div v-if="isLogin">
        <li class="dropdown-menu-item"><a href="#"><i class="iconfont icon-person"></i>My Profile</a></li>
        <li class="dropdown-menu-item"><a href="#"><i class="iconfont icon-setting"></i>Setting</a></li>
        <li class="dropdown-menu-item--divider"></li>
        <li class="dropdown-menu-item" @click="logOutConfirm"><a><i class="iconfont icon-poweroff"></i>Logout</a></li>
      </div>
      <div v-else>
        <li class="dropdown-menu-item"><router-link to='/' tag="a">Login</router-link></li>
      </div>
    </ul>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isShowHeaderSubMenu: false
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  created () {
    document.addEventListener('click', this.hideSubMenu)
  },
  methods: {
    toggleShowSubMenu () {
      this.isShowHeaderSubMenu = !this.isShowHeaderSubMenu
    },
    hideSubMenu () {
      this.isShowHeaderSubMenu = false
    },
    logOutConfirm () {
      this.$confirm('是否要退出当前账户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.logout()

          this.$router.push({ path: '/' })
          this.$message.warning('用户已注销')
        })
        .catch(_ => {})
    },
    ...mapMutations([
      'logout'
    ])
  }
}

</script>

<style lang="scss" scoped>
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

  &-dropdown-menu {
    position:absolute;
    background: #222;
    left:auto;
    width:200px;
    right:10px;
    top:100%;
    z-index: 2001;
    min-width:160px;
    padding:5px 0;
    margin:-2px 0 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    border:1px solid rgba(0, 0, 0, .15);
    border-radius:4px;
    box-shadow:0 6px 12px rgba(0, 0, 0, .175);
    -webkit-box-shadow:0 6px 12px rgba(0, 0, 0, .175);
    .dropdown-menu-item {
      a {
        color:#ddd;
        padding:8px;
        font-size: 15px;
        display: block;
        clear:both;
        font-weight: normal;
        text-decoration: none;

        i {
          vertical-align: bottom;
          font-size: 20px;
          margin-right: 10px;
        }
      }

      a:hover {
        background: #3355ff;
      }
    }

    .dropdown-menu-item--divider {
      height:1px;
      background-color: #e5e5e5;
      margin:9px 0;
      overflow: hidden;
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

  &-search {
    height:100px;
    margin-right: 20px;
    .customInput {
      margin: 30px 10px;
    }
  }
}

@media (min-width: 1200px) and (max-width: 1366px) {
  .backstage-header {
    height:75px;
    &-logo {
      img {
        display: inline-block;
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

    &-dropdown-menu {
      width:180px;
      min-width:120px;
      padding:5px 0;
      .dropdown-menu-item {
        a {
          i {
            font-size: 16px;
          }
        }
      }

      .dropdown-menu-item--divider {
        margin:4px 0;
      }
    }

    &-search {
      height: 100%;
      margin-right: 20px;
      .customInput {
        margin: 20px 10px;
      }
    }
  }
}

</style>
