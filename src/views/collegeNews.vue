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
    </div>

    <el-card class="page-container">

      <div class="tablePage" v-show="!isEdit && !isAdd && !isRead" v-loading="isLoading">
        <el-table
          :data="tableData"
          border
          style="width: 100%;color:#333;">
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
            align="center">
          </el-table-column>
          <el-table-column
            prop="preview"
            label="内容简介"
            min-width="350"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center">
            <template slot-scope="scope">
              <el-button
                v-if="isWrite"
                @click.native.prevent="deleteItemSubmit(scope.row)"
                type="text"
                size="small">
                <i class="iconfont icon-delete table-button-delete"></i>
              </el-button>
              <el-button
                v-if="isWrite"
                @click="editItem(scope.row)"
                type="text"
                size="small">
                <i class="iconfont icon-edit06 table-button-edit"></i>
              </el-button>
              <el-button
                @click="readItem(scope.row)"
                type="text"
                size="small">
                <i class="iconfont icon-readme table-button-read"></i>
              </el-button>
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
          <el-form-item label="内容简介" prop="preview">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              v-model="operateForm.preview">
            </el-input>
          </el-form-item>
          <el-form-item class="wang-editor">
            <wang-editor ref="editor" :catchData="catchData"></wang-editor>
          </el-form-item>
          <el-form-item>
            <el-button v-show="isEdit " type="success" @click="editItemSubmit">完成</el-button>
            <el-button v-show="isAdd" type="success" @click="addItemSubmit">添加</el-button>
            <el-button v-show="isRead" type="success" @click="resetOperateForm" class="read-button">返回</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAcademyData, editAcademyData, addAcademyData, updateAcademyData, deleteAcademyData } from '@api/index'

export default {
  data () {
    return {
      isLoading: false,
      isWrite: true,
      section: '',
      tableData: [],
      operateForm: {
        id: '',
        title: '',
        created_time: '',
        preview: '',
        content: ''
      },
      currentPage: 1,
      total: 0,
      pageSize: 10,
      pageTableData: '',
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
        })
        .then(_ => getAcademyData(this.section, params))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            let data = res.data
            this.tableData = data.results
            this.total = data.count
            this.pageSize = this.total < 10 ? this.total : 10
          }
          this.isLoading = false
        })
        .catch(error => this.showError('get', error))
    },
    checkWritePermission () {
      this.isWrite = this.permissions.findIndex(item => item.codename.indexOf(`write_${this.section}`)) >= 0
    },
    // 改变页面状态
    addItem () {
      this.resetOperateForm()
      this.operateForm.created_time = new Date()
      this.isAdd = true
    },
    editItem (row) { // 打开编辑页面
      this.isEdit = true
      this.isLoading = true
      editAcademyData(this.section, row.id)
        .then(res => {
          if (res.status === 200) {
            for (let key in this.operateForm) {
              this.operateForm[key] = res.data[key]
            }
            this.$refs.editor.initialEditorContent(this.operateForm.content)
          }
        })
        .then(_ => {
          this.isLoading = false
        })
        .catch(error => {
          this.showError('get', error)
          this.resetOperateForm()
        })
    },
    readItem (row) {
      this.isRead = true
      this.isLoading = true
      editAcademyData(this.section, row.id)
        .then(res => {
          if (res.status === 200) {
            for (let key in this.operateForm) {
              this.operateForm[key] = res.data[key]
            }
            this.$refs.editor.initialEditorContent(this.operateForm.content)
          }
        })
        .then(_ => {
          this.isLoading = false
        })
        .catch(error => {
          this.showError('get', error)
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
            title: this.operateForm.title,
            created_time: this.operateForm.created_time,
            preview: this.operateForm.preview,
            content: this.operateForm.content
          }

          return addAcademyData(this.section, params)
            .then(_ => {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            })
            .then(_ => this.getPageData())
            .then(_ => this.resetOperateForm())
            .catch(error => this.showError('add', error))
        })
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
            .then(_ => this.getPageData())
            .catch(error => this.showError('delete', error))
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
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
              }
            })
            .then(_ => this.getPageData())
            .then(_ => this.resetOperateForm())
            .catch(error => this.showError('edit', error))
        })
    },
    resetOperateForm () {
      console.log('reset')
      for (let key in this.operateForm) {
        this.operateForm[key] = ''
      }
      this.isRead = false
      this.isEdit = false
      this.isAdd = false
      // 清空内容
      this.$refs.editor.initialEditorContent('')
    },
    showError (type, error) {
      this.$message.error('操作失败')
      this.isLoading = false
      console.log(`${type} error`, error)
    },
    catchData (value) {
      // 在这里接受子组件传过来的参数，赋值给data里的参数
      this.operateForm.content = value
    }
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
.read-button {
  width: 50%;
}
</style>
