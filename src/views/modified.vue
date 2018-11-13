<template lang="html">
  <div class="page modified-info">

    <div class="top-bar">
      <el-button @click="addItem"
                 type="text"
                 size="small"
                 class="top-bar-button-right right pointer"><i class="iconfont icon-plus"></i></el-button>
      <el-button @click="resetOperateForm"
                 type="text"
                 size="small"
                 class="top-bar-button-left left pointer"><i class="iconfont icon-arrowsleftline"></i></el-button>
    </div>

    <el-card class="page-container">

      <div class="tablePage" v-show="!isEdit && !isAdd" v-loading="isLoading" v-if="operateForm">
        <el-table
          :data="tableData"
          border
          style="width: 100%;color:#333;">
          <el-table-column
            fixed
            align="center"
            prop="created_time"
            label="创建日期"
            sortable>
          </el-table-column>
          <el-table-column
            v-if="isStudent"
            prop="grade"
            align="center"
            label="年级">
          </el-table-column>
          <el-table-column
            v-if="isStudent"
            prop="major"
            align="center"
            label="专业">
          </el-table-column>
          <el-table-column
            v-if="isStudent"
            prop="stu_class"
            align="center"
            label="班级">
          </el-table-column>
          <el-table-column
            prop="username"
            align="center"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="clientType"
            align="center"
            label="账户类型"
            width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteItemSubmit(scope.row)"
                         type="text"
                         size="small">
                         <i class="iconfont icon-delete" style="color:red;font-size:30px;"></i>
                         </el-button>
              <el-button @click="editRow(scope.row)"
                         type="text"
                         size="small">
                         <i class="iconfont icon-edit06" style="color:rgb(84, 80, 218);font-size:30px;"></i>
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

      <div class="editPage" v-show="isAdd^isEdit" v-loading="isLoading">
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
          <el-form-item label="年级" prop="grade" v-if="isStudent" align="left">
            <el-select v-model="operateForm.grade" placeholder="请选择" size="medium" @change="selectTypeChange(operateForm.grade, operateForm.major)">
              <el-option
                v-for="item in gradeType"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业" prop="major" v-if="isStudent" align="left">
            <el-select v-model="operateForm.major" placeholder="请选择" size="medium" @change="selectTypeChange(operateForm.grade, operateForm.major)">
              <el-option
                v-for="item in majorType"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="stu_class" v-if="isStudent" align="left">
            <el-select v-model="operateForm.stu_class" placeholder="请选择" size="medium">
              <el-option
                v-for="item in banJiType"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" prop="username" align="left">
            <el-input v-model="operateForm.username" required></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" align="left">
            <el-input v-model="operateForm.password" required></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-show="!isAdd" type="success" @click="editItemSubmit">完成</el-button>
            <el-button v-show="isAdd" type="success" @click="addItemSubmit">添加</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import { getAcademyData, editAcademyData, addAcademyData, updateAcademyData, deleteAcademyData } from '@api/index'

export default {
  data () {
    return {
      section: '',
      gradeType: [],
      majorType: [],
      banJiType: [],
      tableData: [],
      operateForm: {},
      currentPage: 1,
      pageSize: 6,
      total: 0,
      isStudent: false,
      isLoading: false,
      isEdit: false,
      isAdd: false
    }
  },
  mounted () {
    // 当前页面分类
    // 初始化数据
    this.initialPageData()
  },
  computed: {
    type () {
      return this.$store.state.testData.type
    }
  },
  watch: {
    '$route': 'onRouteChange'
  },
  methods: {
    // 当路由发生变化
    initialPageData () {
      this.tableData = []
      this.section = this.$route.params.category // teacher or student
      this.isStudent = this.section === 'student'
      this.currentPage = 1
      this.resetOperateForm()
      this.getPageData()
    },
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
            this.tableData = this.processData(data.results)
            this.total = data.count
            this.pageSize = this.total < 10 ? this.total : 10
          }
          this.isLoading = false
        })
        .catch(error => this.showError('get', error.response))
    },
    // 处理数据
    processData (data) {
      let results = data.map(item => {
        return {
          pk: item.user.pk,
          created_time: item.user.date_joined,
          username: item.user.username,
          grade: item.grade || '',
          major: item.major || '',
          stu_class: item.stu_class || '',
          clientType: this.section === 'teacher' ? '老师' : '学生'
        }
      })

      return results
    },
    addItem () {
      this.resetOperateForm()
      this.operateForm.created_time = new Date()
      this.isAdd = true
    },
    editRow (row) { // 打开编辑页面
      this.isEdit = true
      this.isLoading = true
      editAcademyData(this.section, row.pk)
        .then(res => {
          if (res.status === 200) {
            let item = res.data
            this.operateForm = {
              pk: item.user.pk,
              created_time: item.user.date_joined,
              username: item.user.username,
              password: '',
              grade: item.grade || '',
              major: item.major || '',
              stu_class: item.stu_class || '',
              clientType: this.section === 'teacher' ? '老师' : '学生'
            }
          }
        })
        .then(_ => {
          this.isLoading = false
        })
        .catch(error => {
          this.$message.error('获取信息失败', error)
          this.resetOperateForm()
        })
    },
    addItemSubmit () { // 确定添加纪录
      this.$confirm('确定要添加该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          let params = this.getParams()
          return addAcademyData(this.section, params)
          // 确定表单数据
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            })
            .then(_ => this.getPageData())
            .then(_ => this.resetOperateForm())
            .catch(error => this.showError('add', error))
        })
    },
    deleteItemSubmit (row) { // 删除记录
      this.$confirm('你确定要删除该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          return deleteAcademyData(this.section, row.pk)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }
            })
            .then(_ => this.getPageData())
            .catch(error => this.showError('delete', error))
        })
    },
    editItemSubmit (formName) {
      this.$confirm('确定要修改该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          let params = this.getParams()
          return updateAcademyData(this.section, this.operateForm.pk, params)
            .then(res => {
              console.log(res)
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
    // 辅助类方法
    resetOperateForm () {
      this.isEdit = false
      this.isAdd = false
      if (this.section === 'teacher') {
        this.operateForm = {
          pk: '',
          created_time: '',
          username: '',
          password: '',
          clientType: '1'
        }
      } else {
        this.operateForm = {
          pk: '',
          created_time: '',
          username: '',
          password: '',
          grade: '',
          major: '',
          stu_class: '',
          clientType: '2'
        }

        this.gradeType = this.type.map(item => item.grade)
        this.majorType = this.type[this.type.length - 1].major // 初始化专业类型
        this.banJiType = this.majorType[0].banJi // 初始化专业的班级数量
        this.operateForm.grade = this.gradeType[this.gradeType.length - 1]
        this.operateForm.major = this.majorType[0].name
        this.operateForm.stu_class = this.banJiType[0].label // 初始化班级 #1班#
      }
    },
    showError (type, error) {
      this.$message.error(`${type} error`)
      this.isLoading = false
      console.log(`${type} error`, error)
    },
    getParams () {
      // 确定数据
      if (this.section === 'teacher') {
        return {
          username: this.operateForm.username,
          password: this.operateForm.password
        }
      } else {
        return {
          username: this.operateForm.username,
          password: this.operateForm.password,
          grade: this.operateForm.grade,
          stu_class: this.operateForm.stu_class,
          major: this.operateForm.major
        }
      }
    },
    selectTypeChange (grade, major) { // 年级和班级选择器改变的时候
      this.majorType = this.type[this.gradeType.findIndex(item => item === grade)].major

      this.banJiType = this.majorType[this.majorType.findIndex(item => item.name === major)].banJi
    },
    validateForm () { // 验证表单
      // 老师 1 学生 0
      if (this.operateForm.clientType) { // 选项为老师的时候
        // 验证账号密码长度
        let username = this.operateForm.username.length
        if (username < 3 && username > 15) { // 判断用户名长度
          this.$message({
            type: 'error',
            message: '用户名不符合规格(3-15)'
          })
          return false
        } else {
          let password = this.operateForm.password.length
          if (password < 3 && password > 15) {
            this.$message({
              type: 'error',
              message: '密码不符合规格(3-15)'
            })
            return false
          } else {
            return true // 符合规格
          }
        }
      } else { // 选项为学生的时候
        // 验证账号密码长度
        let username = this.operateForm.username.length
        if (username < 3 && username > 15) { // 判断用户名长度
          this.$message({
            type: 'error',
            message: '用户名不符合规格(3-15)'
          })
          return false
        } else {
          let password = this.operateForm.password.length
          if (password < 3 && password > 15) { // 判断密码长度
            this.$message({
              type: 'error',
              message: '密码不符合规格(3-15)'
            })
            return false
          } else {
            if (!this.operateForm.grade) { // 当年级为空的时候
              this.$message({
                type: 'error',
                message: '年级不能为空'
              })
              return false
            } else {
              if (!this.operateForm.major) { // 专业为空时
                this.$message({
                  type: 'error',
                  message: '专业不能为空'
                })
                return false
              } else {
                if (!this.operateForm.stu_class) { // 班级为空时
                  this.$message({
                    type: 'error',
                    message: '班级不能为空'
                  })
                  return false
                } else {
                  return true // 班级 专业 年级都不为空
                }
              }
            }
          }
        }
      }
    },
    // 当路由发生变化
    onRouteChange () {
      // 当前页面分类
      this.initialPageData()
    }
  }
}
</script>

<style lang="scss" scoped>

.page.modified-info {
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
