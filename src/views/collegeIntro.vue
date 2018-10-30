<template lang="html">
  <div class="page college-intro" v-if="isLogin">

    <div class="top-bar">
      <el-button @click="addItem"
                 type="text"
                 size="small"
                 class="top-bar-button-right right pointer"><i class="iconfont icon-plus"></i></el-button>
      <el-button @click="back"
                 type="text"
                 size="small"
                 class="top-bar-button-left left pointer"><i class="iconfont icon-arrowsleftline"></i></el-button>
    </div>

    <el-card class="page-container" v-loading="isLoading">

      <div class="tablePage" v-show="!isEdit && !isAdd">
        <el-table
          :data="tableData"
          border
          style="width: 100%;color:#333;">
          <el-table-column
            fixed
            prop="created_time"
            label="日期"
            align="center"
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
            align="left">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center">
            <template slot-scope="scope">
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
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
        <el-pagination
        background
        :current-page="pagination.currentPage"
        :page-sizes="[5,6,8,10]"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>

      <div class="editPage" v-show="isAdd^isEdit">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="日期" prop="created_time" align="left">
            <el-date-picker
              v-model="ruleForm.created_time"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy 年 MM 月 dd 日"
              @change = "changeTimeFormat()">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容简介" prop="preview">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              v-model="ruleForm.preview">
            </el-input>
          </el-form-item>
          <el-form-item label="html文本" prop="content">
            <el-input v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item class="wang-editor">
            <wang-editor></wang-editor>
          </el-form-item>
          <el-form-item>
            <el-button v-show="!isAdd" type="success" @click="editSubmitForm('ruleForm')">完成</el-button>
            <el-button v-show="isAdd" type="success" @click="addItemSubmit('ruleForm')">添加</el-button>
            <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
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
      section: '',
      category: '',
      tableData: [],
      ruleForm: {
        id: '',
        title: '',
        created_time: '',
        preview: '',
        content: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 6
      },
      pageTableData: '',
      editingRow: '',
      isEdit: false,
      isAdd: false
    }
  },
  mounted () {
    // 当前页面分类
    this.section = this.$route.name
    this.category = this.$route.params.category

    this.getPageData()
      .then(_ => this.checkPermission())
  },
  created () {
  },
  computed: {
    ...mapState([
      'isLogin',
      'token'
    ])
  },
  methods: {
    getPageData() {
      // 获取页面数据
      let params = {
        category: this.category,
        page: this.pagination.currentPage,
        token: this.token
      }

      return new Promise((resolve, reject) => {
        this.isLoading = true
        resolve()
      })
        .then(_ => getAcademyData(this.section, params))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.tableData = res.data.results
          }
        })
        .then(_ => this.isLoading = false)
    },
    checkPermission() {

    },
    addItem () {
      this.isAdd = true
      this.isEdit = false
    },
    back () {
      this.resetRuleForm()
    },
    addItemSubmit () { // 确定添加纪录
      this.$confirm('确定要添加该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // TODO 添加一条信息
          // this.addSchoolInfo()
          let params = {
            title: this.ruleForm.title,
            created_time: this.ruleForm.created_time,
            preview: this.ruleForm.preview,
            content: this.ruleForm.content
          }

          return addAcademyData(this.section, params)
        })
        .then(res => {
          res = JSON.stringify(res)
          if (res.status === 200) {
            
            this.tableData = res.data.results
          }
        })
        .then(_ => {
          // uploadData success
          this.resetRuleForm()
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        })
        .then(_ => {
          this.getPageData()
        })
        .catch(() => {
        })
    },
    // TODO: 编辑页面
    deleteRow (index, rows) { // 删除记录
      this.$confirm('你确定要删除该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO deleteSchoolInfo() 传id
        addAcademyData(this.section, params)
          .then(res => {
            res = JSON.stringify(res)
            if (res.status === 200) {
              
              this.tableData = res.data.results
            }
          })
        rows.splice(index, 1) // 从rows数据里删除一个
        // uploadData
      }).catch(() => {
      })
    },
    editSubmitForm (formName) {
      this.$confirm('确定要修改该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // TODO updateSchoolInfo(params) 传id 和各个数据
        
        return updateAcademyData(this.section, this.ruleForm.id, this.ruleForm)
      })
      .then(_ => {
        this.resetRuleForm()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
      .then(_ => {
        this.getPageData()
      })
      .catch(res => {
        console.log(res)
      })
      .catch(() => {
        console.log('error submit!!')
        return false
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    resetRuleForm () {
      for (let key in this.ruleForm) {
        this.ruleForm[key] = ''
      }
      this.isEdit = false
      this.isAdd = false
    },
    changeTimeFormat () {
      let date = new Date(this.ruleForm.date)
      let now = new Date()
      let y = date.getFullYear() // 获取年
      let m = date.getMonth() + 1 // 获取月
      let d = date.getDate() // 获取日
      let h = now.getHours() // 获取小时
      let mm = now.getMinutes() // 获取分钟
      let s = now.getSeconds() + 1 // 获取秒
      m = m < 10 ? '0' + m : m // 判断月是否大于10
      d = d < 10 ? ('0' + d) : d // 判断日期是否大10
      h = h < 10 ? '0' + h : h // 判断小时是否大10
      mm = mm < 10 ? '0' + mm : mm // 判断分钟是否大10
      s = s < 10 ? '0' + s : s // 判断秒数是否大10
      this.ruleForm.date = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s // 返回时间格式
    },
    editRow (row, index) { // 打开编辑页面
      this.isEdit = true

      this.isLoading = true
      editAcademyData(this.section, row.id)
        .then(res => {
          if (res.status === 200) {
            for (let key in this.ruleForm) {
              this.ruleForm[key] = res.data[key]
            }
          }
        })
        .then(_ => {
          this.isLoading = false
        })
    },
    ...mapMutations([
      'loading'
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
.table-button-delete{
  color:red;
  font-size:25px;
}

.table-button-edit{
  color:rgb(84, 80, 218);
  font-size:25px;
}
</style>
