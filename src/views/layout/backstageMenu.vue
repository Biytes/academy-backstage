<template lang="html">
  <div id="backstage-menu" v-show="isLogin">

    <el-col>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#404040"
        text-color="#fff"
        active-text-color="#409EFF"
        :default-active="$route.path"
        router>

        <section v-show="client !== '2'">
          <el-submenu v-for="elMenuItem in elParentMenuItems" :key="`${elMenuItem.index}`" :index="elMenuItem.index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{elMenuItem.linkTitle}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="subMenuItem in elMenuItem.subMenuItems" :index="subMenuItem.router" :key="`${subMenuItem.index}`" >
                {{subMenuItem.linkTitle}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-for="elMenuItem in elSingleMenuItems" :key="`${elMenuItem.index}`" :index="elMenuItem.router">
            <i class="el-icon-menu"></i>
            <span>{{elMenuItem.linkTitle}}</span>
          </el-menu-item>
        </section>

        <section class="student-menu">
          <el-menu-item index="/shelf">
            <i class="el-icon-menu"></i>
            <span>学院证书</span>
          </el-menu-item>
        </section>

      </el-menu>
    </el-col>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      isCollapse: true,
      elParentMenuItems: [
        {
          index: '1',
          linkTitle: '学院信息',
          subMenuItems: [
            {
              index: '1-1',
              linkTitle: '学院简介',
              router: '/schoolInfo/about'
            },
            {
              index: '1-2',
              linkTitle: '机构建设',
              router: '/schoolInfo/facility'
            },
            {
              index: '1-3',
              linkTitle: '师资建设',
              router: '/schoolInfo/teacher'
            },
            {
              index: '1-4',
              linkTitle: '专业设置',
              router: '/schoolInfo/major'
            }
          ]
        },
        {
          index: '2',
          linkTitle: '教学信息',
          subMenuItems: [
            {
              index: '2-1',
              linkTitle: '教学文件',
              router: '/educationInfo/file'
            },
            {
              index: '2-2',
              linkTitle: '资源下载',
              router: '/educationInfo/download'
            },
            {
              index: '2-3',
              linkTitle: '实验中心规章',
              router: '/educationInfo/protocol'
            },
            {
              index: '2-4',
              linkTitle: '教学管理',
              router: '/educationInfo/management'
            }
          ]
        },
        {
          index: '3',
          linkTitle: '学生信息',
          subMenuItems: [
            {
              index: '3-1',
              linkTitle: '工作动态',
              router: '/studentInfo/condition'
            },
            {
              index: '3-2',
              linkTitle: '班团风采',
              router: '/studentInfo/moment'
            },
            {
              index: '3-3',
              linkTitle: '新生军训',
              router: '/studentInfo/militaryTraining'
            },
            {
              index: '3-4',
              linkTitle: '实践创新',
              router: '/studentInfo/practice'
            },
            {
              index: '3-5',
              linkTitle: '学风建设',
              router: '/studentInfo/motto'
            },
            {
              index: '3-6',
              linkTitle: '学生荣誉',
              router: '/studentInfo/glory'
            }
          ]
        },
        {
          index: '4',
          linkTitle: '党建信息',
          subMenuItems: [
            {
              index: '4-1',
              linkTitle: '党建工作',
              router: '/communistInfo/work'
            },
            {
              index: '4-2',
              linkTitle: '机构设置',
              router: '/communistInfo/facility'
            },
            {
              index: '4-3',
              linkTitle: '组织生活',
              router: '/communistInfo/organization'
            },
            {
              index: '4-4',
              linkTitle: '入党指引',
              router: '/communistInfo/instruction'
            }
          ]
        },
        {
          index: '5',
          linkTitle: '对外合作',
          subMenuItems: [
            {
              index: '5-1',
              linkTitle: '国际合作',
              router: '/cooperateInfo/international'
            },
            {
              index: '5-2',
              linkTitle: '校企合作',
              router: '/cooperateInfo/enterprise'
            }
          ]
        },
        {
          index: '6',
          linkTitle: '学院相册',
          subMenuItems: [
            {
              index: '6-1',
              linkTitle: '实验中心',
              router: '/gallery/lab'
            },
            {
              index: '6-2',
              linkTitle: '中荷交流',
              router: '/gallery/netherland'
            }
          ]
        }
      ],
      elSingleMenuItems: [
        {
          index: '7',
          linkTitle: '教师队伍',
          router: '/teacher'
        },
        {
          index: '8',
          linkTitle: '新闻中心',
          router: '/news'
        },
        {
          index: '9',
          linkTitle: '友情链接',
          router: '/friendlyLink'
        },
        {
          index: '10',
          linkTitle: '微博发布',
          router: '/reportBlog'
        },
        {
          index: '11',
          linkTitle: '修改密码',
          router: '/modified'
        },
        {
          index: '12',
          linkTitle: '活动发布',
          router: '/event'
        },
        {
          index: '13',
          linkTitle: '学院证书',
          router: '/certificate'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'client'
    ])
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  }
}
</script>

<style lang="scss">
$height: 810px;
// 响应式 更改height就行了

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
  max-width: 28em;
  left:0;
  margin: 10px 0 0 10px;
  height: $height;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 8px;

  & > .el-col{
    height: 100%;
  }
  .el-menu{
    text-align: left;
    font-weight: bold;
    height: 100%;
  }

  .el-submenu__icon-arrow{
    font-size: 16px;
    font-weight: 800;
  }

  .el-menu-item a{
    text-decoration: none;
    color:#fff;
  }

}
@media (min-width: 1200px) and (max-width: 1366px) {
  .el-submenu .el-menu-item{
    width: 195.555px;
    min-width: 195.55px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width:195.555px;
  }
}

</style>
