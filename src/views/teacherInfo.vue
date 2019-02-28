<template lang="html">
  <div class="page teacher-info">

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
            prop="name"
            label="名字"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            label="图片"
            align="center"
            width="200">
              <template slot-scope="scope">
                <img  @click="showImagePage(scope.row.imageUrl)" :src="scope.row.imageUrl" height="100" alt="">
              </template>
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="brief"
            label="个人简介"
            min-width="300"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <div>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button
                    v-if="isWrite"
                    @click.native.prevent="deleteItemSubmit(scope.$index, tableData)"
                    type="text"
                    size="small">
                    <i class="iconfont icon-delete" style="color:red;font-size:30px;"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button
                    v-if="isWrite"
                    @click="previewItem(scope.row, 'edit')"
                    type="text"
                    size="small">
                    <i class="iconfont icon-edit" style="color:rgb(84, 80, 218);font-size:30px;"></i>
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
              </div>
            </template>
          </el-table-column>
        </el-table>
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
          <el-form-item label="姓名" prop="name">
            <el-input v-model="operateForm.name" required></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input v-model="operateForm.position" required></el-input>
          </el-form-item>
          <el-form-item label="教师图片:" prop="image" align="left">
            <image-uploader :syncImage.sync="operateForm.image"
                            ref="imageUploader"
                            :imageUrl="operateForm.imageUrl"
                            type="id"
                            width="300"
                            height="300"></image-uploader>
          </el-form-item>
          <el-form-item label="简洁简介" prop="brief">
            <el-input type="textarea" v-model="operateForm.brief"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="operateForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="content">
            <wang-editor ref="editor" :catchData="catchData"></wang-editor>
          </el-form-item>
          <el-form-item>
            <el-button v-show="isEdit " type="success" @click="editItemSubmit">完成</el-button>
            <el-button v-show="isAdd" type="success" @click="addItemSubmit">添加</el-button>
            <el-button v-show="isRead" type="success" @click="resetOperateForm" class="read-button">返回</el-button>
            <el-button v-show="!isRead" type="warning" @click="resetOperateForm">返回</el-button>
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
  mounted () {
    this.section = this.$route.name

    this.checkWritePermission()
    this.getPageData()
  },
  data () {
    return {
      isLoading: false,
      isEdit: false,
      isAdd: false,
      isWrite: true,
      isRead: false,
      section: '',
      category: '',
      currentPage: 1,
      total: 0,
      pageSize: 10,
      operateForm: {
        id: '',
        name: '',
        image: '',
        position: '',
        brief: '',
        email: '',
        content: ''
      },
      tableData: []
    }
  },
  computed: {
    ...mapState([
      'permissions'
    ])
  },
  methods: {
    getPageData () {
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
            this.tableData = data.map(item => this.processData(item))
            this.total = data.count
            this.pageSize = this.total < 10 ? this.total : 10
          }
          this.isLoading = false
        })
        .catch(error => this.showError(error))
    },
    checkWritePermission () {
      this.isWrite = this.permissions.findIndex(item => item.codename.indexOf(`write_${this.section}`) >= 0) >= 0
    },
    processData (item = {}) {
      return {
        id: item.id || null,
        imageUrl: `https://schooltest.zunway.pw/media/${item.image_url}` || null,
        image: item.image || null,
        name: item.name || null,
        brief: item.brief || null,
        position: item.position || null,
        email: item.email || null,
        content: item.content || null
      }
    },
    // 控制page状态
    addItem () {
      this.resetOperateForm()
      this.isAdd = true
    },
    previewItem (row, mode) { // 打开编辑页面
      this.resetOperateForm()
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
    addItemSubmit () {
      this.$confirm('你确定要添加该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.loading = true
          let params = {
            name: this.operateForm.name,
            position: this.operateForm.position,
            brief: this.operateForm.brief,
            email: this.operateForm.email,
            image: this.operateForm.image,
            content: this.operateForm.content
          }

          return addAcademyData(this.section, params)
            .then(_ => {
              this.$message.success('添加成功')
            })
            .then(_ => this.getPageData())
            .then(_ => this.resetOperateForm())
            .catch(error => this.showError(error))
        })
        .catch(_ => {})
    },
    deleteItemSubmit (index, rows) {
      this.$confirm('你确定要删除该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          return deleteAcademyData(this.section, rows[index].id)
            .then(res => {
              if (res.status === 200) {
                this.$message.success('删除成功')
              }
            })
            .then(_ => this.getPageData())
            .catch(error => this.showError(error))
        })
        .catch(_ => {})
    },
    editItemSubmit () {
      this.$confirm('你确定要修改该记录！', {
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
        .catch(_ => {})
    },
    previewData (res) {
      this.operateForm = this.processData(res.data)
      this.$refs.imageUploader.catchData(this.operateForm.imageUrl)
      this.$refs.editor.initialEditorContent(this.operateForm.content)
    },
    showError (error) {
      this.$message.error(error.data.msg)
      console.log('error status:', error.status, 'error:', error)
      this.isLoading = false
    },
    catchData (value) {
      // 在这里接受子组件传过来的参数，赋值给data里的参数
      this.operateForm.content = value
    },
    resetOperateForm () {
      this.operateForm = this.processData({})
      this.$refs.imageUploader.clearUrl()
      this.$refs.editor.initialEditorContent('')
      this.isEdit = false
      this.isAdd = false
      this.isRead = false
    },
    ...mapMutations([
      'showImagePage'
    ])
  }
}
</script>

<style lang="scss" scoped>

.page.teacher-info {
  .el-pagination{
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
.table-button-delete{
  color:red;
  font-size:25px;
}

.table-button-edit{
  color:rgb(84, 80, 218);
  font-size:25px;
}
</style>
