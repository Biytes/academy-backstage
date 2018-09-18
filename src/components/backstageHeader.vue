<template lang="html">
  <div id="backstage-header">
    <div class="backstage-logo left">
      <img src="@img/logo/logo.png" alt="">
      <img src="@img/logo/学院.png" alt="">
    </div>
    <div class="backstage-header-menu right" :class="{'header-menu-hover':subMenu}" @click.stop="showSubMenu">
      <i class="iconfont icon-down"></i>
      <i class="iconfont icon-accessibility"></i>
    </div>
    <div class="backstage-search-icon right">
      <input type="email" v-show="searchInput" class="custom__input" placeholder="Search Something ..." />
      <i class="iconfont icon-search" @click="showSearchInput()"></i>
    </div>
    <ul class="sub-dropdown-menu" v-show="subMenu && loginStatus">
      <li><a href="#"><i class="iconfont icon-person"></i>My Profile</a></li>
      <li><a href="#"><i class="iconfont icon-setting"></i>Setting</a></li>
      <li class="divider"></li>
      <li @click="logOut()"><a><i class="iconfont icon-poweroff"></i>Logout</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      subMenu: false,
      searchInput: false
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.status
    }
  },
  created () {
    document.addEventListener('click', this.hideSubMenu)
  },
  methods: {
    showSubMenu () {
      this.subMenu = !this.subMenu
      console.log(this.subMenu)
    },
    hideSubMenu () {
      this.subMenu = false
    },
    showSearchInput () {
      if (!this.searchInput) {
        this.searchInput = true
      } else {
        this.searchInput = false
      }
    },
    logOut () {
      this.$confirm('是否要退出当前账户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.state.menu = false
        this.$router.push({ path: '/' })
        this.$message({
          type: 'warning',
          message: '用户已注销'
        })
      })
    }
  }
}

</script>

<style lang="css">
#backstage-header{
  width:calc(100%-(30px));
  height:100px;
  background: #222222;
  padding:0 15px;
  position: relative;
}
.backstage-logo{
  padding:5px 0 0px;
  width:180px;
  margin-left: 5px;
}
.backstage-logo img{
  float:left;
  width:163.863px;
  height:47.8px;
}
.backstage-header-menu{
  height:100%;
  width:130px;
  cursor: pointer;
  right: 20px;
  line-height: 1.5;
}
.backstage-search-icon{
  height:100%;
  cursor: pointer;
  right: 20px;
  padding:30px 30px 0px 0px;
}
.backstage-search-icon i{
  font-size: 34px;
  color:#777;
  padding: 5px;
}
.backstage-search-icon i:hover{
  color:#fff;
}
.backstage-header-menu:hover{
  background-color: #080808;
}
.header-menu-hover{
  background-color: #080808;
}
.backstage-header-menu i{
  color:#777;
}
.backstage-header-menu:hover i{
  color:#fff;
}
.backstage-header-menu i:last-child{
  padding:15px 15px 15px 0px;
  font-size: 65px;
}
ul.sub-dropdown-menu{
  position:absolute;
  background: #222;
  left:auto;
  width:200px;
  right:10px;
  top:100%;
  z-index: 10;
}
ul.sub-dropdown-menu{
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
}
ul.sub-dropdown-menu > li > a{
  color:#ddd;
  padding:8px;
  font-size: 15px;
  display: block;
  clear:both;
  font-weight: normal;
  text-decoration: none;
}
ul.sub-dropdown-menu > li > a:hover{
  background: #3355ff;
}
ul.sub-dropdown-menu > li > a > i{
  vertical-align: bottom;
  font-size: 20px;
  margin-right: 10px;
}
ul.sub-dropdown-menu > li.divider{
  height:1px;
  background-color: #e5e5e5;
  margin:9px 0;
  overflow: hidden;
}
.backstage-search-icon .custom__input{
  width: 260px;
  padding: 11px 18px;
  vertical-align: top;
}
@media (min-width: 1200px) and (max-width: 1366px) {

  #backstage-header{
    height:75px;
  }
  .backstage-logo img{
    height: 35.85px;
    width: 122.89725px;
  }
  .backstage-header-menu{
    width:100px;
  }
  .backstage-header-menu i:last-child{
    padding: 15px 0 15px 0;
    font-size: 45px;
  }
  .backstage-search-icon{
    padding: 15px 15px 0px 0px;
  }
  .backstage-search-icon .custom__input{
    width: 230px;
    padding:10px;
  }
}

</style>
