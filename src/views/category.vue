<template lang="html">
  <div class="page college-intro">

    <div class="top-bar">
      <el-button v-if="isWrite"
                 @click="addItem"
                 type="text"
                 size="small"
                 class="top-bar-button-right right pointer"><i class="iconfont icon-plus"></i></el-button>
      <el-button v-if="isWrite"
                 @click="resetOperateForm"
                 type="text"
                 size="small"
                 class="top-bar-button-left left pointer"><i class="iconfont icon-arrowsleftline"></i></el-button>
      <div style="margin-left: 20px;" class="left">
        <el-input placeholder="请输入要搜索的关键字"
                  v-model="searchKey"
                  size="mini"
                  clearable
                  @keyup.enter.native="getPageData"></el-input>
      </div>
    </div>

    <el-card class="page-container">

      <div class="tablePage" v-show="!isEdit && !isAdd && !isRead" v-loading="isLoading">
        <el-table
          :data="tableData"
          border
          style="width: 100%;color:#333;">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            align="center"
            min-width="50"
            sortable>
          </el-table-column>
          <el-table-column
            fixed
            prop="created_time"
            label="日期"
            align="center"
            min-width="100"
            sortable>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            min-width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="section"
            label="所属模块"
            align="center"
            width="250">
          </el-table-column>
          <el-table-column
            prop="name"
            label="路径"
            align="center"
            width="250">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button
                  v-if="isWrite"
                  @click.native.prevent="deleteItemSubmit(scope.row)"
                  type="text"
                  size="small">
                  <i class="iconfont icon-delete table-button-delete"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button
                  v-if="isWrite"
                  @click="previewItem(scope.row, 'edit')"
                  type="text"
                  size="small">
                  <i class="iconfont icon-edit table-button-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="只读" placement="top">
                <el-button
                  @click="previewItem(scope.row, 'read')"
                  type="text"
                  size="small">
                  <i class="iconfont icon-readme table-button-read"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
        <el-pagination
          background
          :current-page.sync="currentPage"
          :total="total"
          :page-size="pageSize"
          @current-change="getPageData"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>

      <div class="editPage" v-show="isAdd || isEdit || isRead" v-loading="isLoading">
        <el-form :model="operateForm" ref="operateForm" label-width="100px" class="demo-operateForm">
          <el-form-item label="日期" prop="created_time" align="left">
            <el-date-picker
              v-model="operateForm.created_time"
              align="right"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy年 MM月 dd日 HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="operateForm.title"></el-input>
          </el-form-item>
          <el-form-item label="路径" prop="name">
            <el-input v-model="operateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属模块" prop="section">
            <el-select v-model="operateForm.section" placeholder="请选择模块" size="middle"  class="left">
              <el-option
                v-for="item in allSection"
                :key="item.id"
                :label="item.title"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="operate-button">
            <el-button v-show="isEdit " type="success" @click="editItemSubmit">完成</el-button>
            <el-button v-show="isAdd" type="success" @click="addItemSubmit">添加</el-button>
            <el-button v-show="isRead" type="success" @click="resetOperateForm">返回</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getAcademyData, editAcademyData, addAcademyData, updateAcademyData, deleteAcademyData } from '@api/index'
export default {
  data () {
    return {
      isLoading: false,
      isWrite: true,
      section: '',
      tableData: [],
      allCategory: [],
      allSection: [],
      operateForm: {
        id: null,
        created_time: null,
        name: null,
        title: null,
        section: null
      },
      currentPage: 1,
      total: 0,
      pageSize: 10,
      searchKey: '',
      isEdit: false,
      isAdd: false,
      isRead: false
    }
  },
  mounted () {
    // 当前页面分类
    this.section = this.$route.name

    this.checkWritePermission()
    this.getPageData()
    // this.$router.push({path: '/component'})
  },
  computed: {
    ...mapState([
      'permissions'
    ])
  },
  methods: {
    getPageData () {
      // 获取页面数据
      let params = {
        page: this.currentPage
      }

      return Promise
        .resolve()
        .then(_ => {
          this.isLoading = true
          return getAcademyData(this.section, params)
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            let data = res.data
            this.allCategory = data.map(item => this.processData(item))
            this.allSection = this.allCategory.filter(item => !item.section)
            this.searchCategory()
            this.createMenu()
            this.total = data.length
            this.pageSize = data.length
          }
          this.isLoading = false
        })
        .catch(error => this.showError(error))
    },
    searchCategory () {
      this.tableData = this.allCategory.filter(item => this.matchSection(item) || this.matchName(item) || this.matchTitle(item))
    },
    matchSection (item) {
      if (item.section) {
        return item.section.indexOf(this.searchKey) >= 0
      } else {
        return false
      }
    },
    matchName (item) {
      if (item.name) {
        return item.name.indexOf(this.searchKey) >= 0
      } else {
        return false
      }
    },
    matchTitle (item) {
      if (item.title) {
        return item.title.indexOf(this.searchKey) >= 0
      } else {
        return false
      }
    },
    checkWritePermission () {
      this.isWrite = this.permissions.findIndex(item => item.codename.indexOf(`write_${this.section}`)) >= 0
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
    // 改变页面状态
    addItem () {
      this.resetOperateForm()
      this.operateForm.created_time = new Date()
      this.isAdd = true
    },
    previewItem (row, mode) { // 打开编辑页面
      if (mode === 'edit') {
        this.isEdit = true
      } else {
        this.isRead = true
      }
      this.isLoading = true
      editAcademyData(this.section, row.id)
        .then(res => {
          if (res.status === 200) {
            this.previewData(res)
          }
          this.isLoading = false
        })
        .catch(error => {
          this.showError(error)
          this.resetOperateForm()
        })
    },
    // 对数据进行操作
    addItemSubmit () {
      this.$confirm('确定要添加该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          // TODO: 添加一条信息
          let params = {
            name: this.operateForm.name,
            title: this.operateForm.title,
            created_time: this.operateForm.created_time,
            section: this.operateForm.section
          }

          return addAcademyData(this.section, params)
            .then(res => {
              if (res.status === 200) {
                this.$message.success('添加成功')
              }
            })
            .then(_ => this.getPageData())
            .then(_ => this.resetOperateForm())
            .catch(error => this.showError(error))
        })
        .catch(_ => {})
    },
    deleteItemSubmit (row) {
      this.$confirm('你确定要删除该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          return deleteAcademyData(this.section, row.id)
            .then(res => {
              if (res.status === 200) {
                this.$message.success('删除成功')
              }
            })
            .then(_ => this.getPageData())
            .catch(error => this.showError(error))
        })
    },
    editItemSubmit () {
      this.$confirm('确定要修改该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          return updateAcademyData(this.section, this.operateForm.id, this.operateForm)
            .then(res => {
              if (res.status === 200) {
                this.$message.success('修改成功')
              }
            })
            .then(_ => this.getPageData())
            .then(_ => this.resetOperateForm())
            .catch(error => this.showError(error))
        })
    },
    previewData (res) {
      this.operateForm = this.processData(res.data)
    },
    resetOperateForm () {
      console.log('reset')
      this.operateForm = this.processData({})
      this.isRead = false
      this.isEdit = false
      this.isAdd = false
      // 清空内容
    },
    showError (error) {
      this.$message.error(JSON.stringify(error))
      console.log('error status:', error.status, 'error:', error)
      this.isLoading = false
    },
    catchData (value) {
      // 在这里接受子组件传过来的参数，赋值给data里的参数
      this.operateForm.content = value
    },
    createMenu () {
      // 只有单个的模块
      let singleSection = this.allSection.filter(item => this.allCategory.findIndex(category => category.section === item.name) < 0)

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
          path: `${subMenuItem[0].path}`,
          name: item.name,
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
    ...mapMutations([
      'saveSideBarMenu'
    ])
  }
}
</script>

<style lang="scss" scoped>

.page.college-intro {
  .el-pagination{
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
.operate-button  .el-button{
  width: 30%;
}
</style>
