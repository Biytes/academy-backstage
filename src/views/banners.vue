<template lang="html">
  <div class="page banners-info">
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

      <div class="tablePage" v-show="!isEdit && !isAdd" v-loading="isLoading">
        <el-table
          :data="tableData"
          border
          style="width: 100%;color:#333;">
          <el-table-column
            fixed
            prop="created_time"
            label="日期"
            width="200">
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
            prop="title"
            label="标题"
            align="center">
          </el-table-column>
          <el-table-column
            prop="brief"
            label="内容简介"
            min-width="200"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center">
            <template slot-scope="scope">
              <div>
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
          <el-form-item label="链接" prop="link">
            <el-input v-model="operateForm.link"></el-input>
          </el-form-item>
          <el-form-item label="banners:" prop="image" align="left">
            <image-uploader :syncImage.sync="operateForm.image"
                            ref="imageUploader"
                            type="id"
                            width="300"
                            height="300"></image-uploader>
          </el-form-item>
          <el-form-item label="内容简介" prop="brief">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              v-model="operateForm.brief">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-show="isEdit " type="success" @click="editItemSubmit">完成</el-button>
            <el-button v-show="isAdd" type="success" @click="addItemSubmit">添加</el-button>
            <el-button v-show="isRead" type="success" @click="resetOperateForm" class="read-button">返回</el-button>
            <el-button v-show="!isRead" type="danger" @click="resetOperateForm">重置</el-button>
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
      currentPage: 1,
      total: 0,
      pageSize: 10,
      operateForm: {
        id: '',
        title: '',
        created_time: '',
        image: '',
        brief: ''
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
            this.tableData = data.results.map(item => this.processData(item))
            this.total = data.count
            this.pageSize = this.total < 10 ? this.total : 10
          }
          this.isLoading = false
        })
        .catch(error => this.showError(error))
    },
    processData (item = {}) {
      return {
        id: item.id || null,
        title: item.title || null,
        created_time: item.created_time || null,
        imageUrl: `https://schooltest.zunway.pw/media/${item.image_url}` || null,
        image: item.image || null,
        brief: item.brief || null,
        link: item.link || null
      }
    },
    checkWritePermission () {
      this.isWrite = this.permissions.findIndex(item => item.codename.indexOf(`write_${this.section}`) >= 0)
    },
    // 控制page状态
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
    addItemSubmit () {
      this.$confirm('你确定要添加该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.loading = true
          let params = {
            title: this.operateForm.title,
            image: this.operateForm.image,
            brief: this.operateForm.brief,
            link: this.link || null
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
    deleteItemSubmit (row) {
      this.$confirm('你确定要删除该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.loading = true
          return deleteAcademyData(this.section, row.id)
            .then(res => {
              if (res.status === 200) {
                this.$message('删除成功')
              }
            })
            .then(_ => this.getPageData())
            .catch(error => this.showError(error))
        })
        .catch(_ => {})
    },
    editItemSubmit (formName) {
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
    },
    showError (error) {
      this.$message.error(error.data.msg)
      console.log('error status:', error.status, 'error:', error)
      this.isLoading = false
    },
    resetOperateForm () {
      this.operateForm = this.processData()
      this.$refs.imageUploader.clearUrl()
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

.page.banners-info {
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
