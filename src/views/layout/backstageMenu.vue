<template lang="html">
  <div id="backstage-menu">

    <el-col style="height: 100%">
      <el-menu
        class="el-menu-vertical-demo"
        style="height: 100%"
        @open="handleOpen"
        @close="handleClose"
        background-color="#404040"
        text-color="#fff"
        active-text-color="#409EFF"
        :default-active="$route.path"
        router>

        <section v-if="userInfo.type !== 2">
          <el-submenu v-for="multiItem in multiSideBarMenu" :key="multiItem.id" :index="multiItem.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ multiItem.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="subItem in multiItem.subMenuItem" :index="subItem.path" :key="subItem.id" >
                {{ subItem.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-for="singleItem in singleSideBarMenu"
                        :key="singleItem.id"
                        :index="singleItem.path">
            <i class="el-icon-menu"></i>
            <span>{{ singleItem.title }}</span>
          </el-menu-item>
        </section>

        <section class="student-menu" v-if="userInfo.type === 2">
          <el-menu-item index="/certificate">
            <i class="el-icon-menu"></i>
            <span>学院证书</span>
          </el-menu-item>
        </section>

      </el-menu>
    </el-col>

  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import { getAcademyData } from '@api/index'
export default {
  data () {
    return {
      isCollapse: true,
      isLoading: false,
      allCategory: [],
      allSection: []
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'singleSideBarMenu',
      'multiSideBarMenu'
    ])
  },
  mounted () {
    this.getMenuData()
  },
  methods: {
    handleOpen () {

    },
    handleClose () {

    },
    getMenuData () {
      // 获取Category数据

      return Promise
        .resolve()
        .then(_ => {
          this.isLoading = true
          return getAcademyData('category')
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            let data = res.data
            this.allCategory = data.map(item => this.processData(item))
            this.allSection = this.allCategory.filter(item => !item.section)
            this.createMenu()
          }
          this.isLoading = false
        })
        .catch(error => this.showError(error))
    },
    processData (item = {}) {
      return {
        id: item.id || null,
        created_time: item.created_time || null,
        name: item.name || null,
        title: item.title || null,
        section: item.section || null
      }
    },
    createMenu () {
      // 只有单个的模块
      let singleSection = this.allSection.filter(item => this.allCategory.findIndex(category => category.section === item.name) < 0)
      if (this.userInfo.type !== 0) {
        singleSection.splice(singleSection.findIndex(item => item.id === 15), 1)
      }
      // 有子菜单的模块
      let multiSection = this.allSection.filter(item => this.allCategory.findIndex(category => category.section === item.name) >= 0)

      let multiSideBarMenu = multiSection.map(item => {
        let section = item.name
        let subMenuItem = this.allCategory.filter(category => category.section === section)
        subMenuItem = subMenuItem.map(menuItem => {
          return {
            id: menuItem.id,
            title: menuItem.title,
            name: menuItem.name,
            path: `/${section}/${menuItem.name}`
          }
        })
        return {
          id: item.id,
          title: item.title,
          name: item.name,
          path: `${subMenuItem[0].path}`,
          subMenuItem
        }
      })

      let singleSideBarMenu = singleSection.map(item => {
        return {
          id: item.id,
          title: item.title,
          name: item.name,
          path: `/${item.name}`
        }
      })

      let sideBarMenu = {
        singleSideBarMenu,
        multiSideBarMenu
      }

      this.saveSideBarMenu(sideBarMenu)
    },
    showError (error) {
      this.$message.error(error)
      console.log('error status:', error.status, 'error:', error)
      this.isLoading = false
    },
    ...mapMutations([
      'saveSideBarMenu'
    ])
  }
}
</script>

<style lang="scss">
$height: 85vh;
// scroll bar
#backstage-menu::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #655d5d;
}

#backstage-menu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f4f4f4;
}

#backstage-menu::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #655d5d;
}

#backstage-menu{
  margin: 10px 0 0 10px;
  height: $height;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 8px;

  .el-submenu__icon-arrow{
    font-size: 16px;
    font-weight: 800;
  }

  .el-menu-item a{
    text-decoration: none;
    color:#fff;
  }

}
</style>
