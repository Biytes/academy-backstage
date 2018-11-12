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
                <img  @click="showImagePage(`https://schooltest.zunway.pw/media/${scope.row.image_url}`)" :src="`https://schooltest.zunway.pw/media/${scope.row.image_url}`" height="100" alt="">
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
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  <i class="iconfont icon-delete table-button-delete"></i>
                </el-button>
                <el-button
                  @click="editRow(scope.row, scope.$index)"
                  type="text"
                  size="small">
                  <i class="iconfont icon-edit06 table-button-edit"></i>
                </el-button>
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
          <el-form-item label="教师图片:" prop="imageUrl" align="left">
            <image-uploader :syncImage.sync="operateForm.imageUrl"
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
        imageUrl: '',
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
        })
        .then(_ => {
          this.isLoading = false
        })
        .catch(error => this.showError('get', error))
    },
    checkWritePermission () {
      this.isWrite = this.permissions.findIndex(item => item.codename.indexOf(`write_${this.section}`)) >= 0
    },
    // 控制page状态
    addItem () {
      this.resetOperateForm()
      this.operateForm.created_time = new Date()
      this.isAdd = true
    },
    editItem (row) { // 打开编辑页面
      for (let key in this.rowNow) {
        this.rowNow[key] = row[key]
      }
      this.isEdit = true
      this.operateForm = row // 使当前要编辑的数据绑定在表中
    },
    readItem (row, index) {
      this.isRead = true
      this.isLoading = true
      editAcademyData(this.section, row.id)
        .then(res => {
          if (res.status === 200) {
            for (let key in this.operateForm) {
              this.operateForm[key] = res.data[key]
            }
          }
        })
        .then(_ => {
          this.isLoading = false
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
            image: this.operateForm.imageUrl,
            brief: this.operateForm.brief
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
        .catch(_ => {})
    },
    deleteItemSubmit (index, rows) {
      this.$confirm('你确定要删除该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.loading = true
          return deleteAcademyData(this.section, rows[index].id)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }
            })
            .then(_ => this.getPageData())
            .catch(error => this.showError('error', error))
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
        .catch(_ => {})
    },
    showError (type, error) {
      this.$message.error('操作失败')
      this.isLoading = false
      console.log(`${type} error`, error)
    },
    resetOperateForm () {
      this.operateForm = {
        id: '',
        title: '',
        imageUrl: '',
        brief: ''
      }
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
