<template lang="html">
  <div class="page modified-info">

    <div class="top-bar">
      <el-row>
        <el-col :span="1">
          <el-button @click="resetOperateForm"
                 type="text"
                 size="small"
                 class="top-bar-button-left left pointer"><i class="iconfont icon-arrowsleftline"></i></el-button>
        </el-col>
        <el-col :span="22">
          <el-row v-if="isStudent">
            <el-col :span="4">
              <el-input placeholder="请输入年级"
                        v-model="grade"
                        size="mini"
                        @keyup.enter.native="getPageData"></el-input>
            </el-col>
            <el-col :span="5" :push="1">
              <el-select v-model="major" placeholder="请选择专业" size="mini" @change="getPageData" class="left">
                <el-option
                  v-for="item in majorType"
                  :key="item.value"
                  :label="item.title"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="请输入班级"
                        v-model="stu_class"
                        size="mini"
                        @keyup.enter.native="getPageData">
                <template slot="append"><span>班</span></template>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-button @click="addItem"
          type="text"
          size="small"
          class="top-bar-button-right right pointer"><i class="iconfont icon-plus"></i></el-button>
      </el-row>
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
            label="创建时间"
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
            <template slot-scope="scope">
              <span>
                {{ scope.row.stu_class }}班
              </span>
            </template>
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
              <div>
                <el-tooltip class="item" effect="dark" content="删除账号" placement="top">
                  <el-button @click.native.prevent="deleteItemSubmit(scope.row)"
                            type="text"
                            size="small">
                            <i class="iconfont icon-delete" title="删除账号" style="color:red;font-size:30px;"></i>
                            </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑账号(必须修改密码)" placement="top">
                  <el-button @click="editItem(scope.row)"
                            type="text"
                            size="small">
                            <i class="iconfont icon-edit" title="账号更改" style="color:rgb(84, 80, 218);font-size:30px;"></i>
                            </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="修改密码(快捷修改密码)" placement="top">
                  <el-button @click="editItemPassword(scope.row)"
                            type="text"
                            size="small">
                            <i class="iconfont icon-password" title="修改密码" style="color:#333;font-size:28px;"></i>
                            </el-button>
                </el-tooltip>
              </div>
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
          <el-form-item label="年级"
                        prop="grade"
                        v-if="isStudent"
                        align="left"
                        :rules="{ required: true, message: '请输入年级(数字)', trigger: 'blur' }">
                        <el-input placeholder="年级" v-model="operateForm.grade"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major" v-if="isStudent" align="left">
            <el-select v-model="operateForm.major" placeholder="请选择" size="medium">
              <el-option
                v-for="(item, index) in majorType"
                v-if="index !== 0"
                :key="item.value"
                :label="item.title"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级(数字)"
                        v-if="isStudent"
                        prop="stu_class"
                        :rules="{ required: true, message: '请输入班级(数字)', trigger: 'blur' }">
            <el-input placeholder="班级" v-model="operateForm.stu_class">
              <template slot="append"><span>班</span></template>
            </el-input>
          </el-form-item>
          <el-form-item label="账号"
                        prop="username"
                        align="left"
                        :rules="[
                          { required: true, message: '请输入账号', trigger: 'blur' },
                          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
                        ]">
            <el-input v-model="operateForm.username" :disabled="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password"
                        align="left"
                        :rules="[
                          { required: true, message: '请输入密码', trigger: 'blur' },
                          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
                        ]">
            <el-input v-model="operateForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="权限管理" prop="user_permissions" align="left" v-if="permissionsList && !isStudent && isEdit">
            <el-transfer v-model="user_permissions"
                         :data="permissionsList"
                         :titles="['未添加权限', '已拥有权限']"></el-transfer>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      section: '',
      grade: '',
      major: '',
      stu_class: '',
      tableData: [],
      operateForm: {},
      user_permissions: [],
      currentPage: 1,
      pageSize: 6,
      total: 0,
      isStudent: false,
      isLoading: false,
      isEdit: false,
      isAdd: false,
      permissionsList: ''
    }
  },
  mounted () {
    // 当前页面分类
    // 初始化数据
    this.initialPageData()
    const permissions = this.permissions
    var data = []
    for (let i = 0; i < permissions.length; i++) {
      data.push({
        key: permissions[i].id,
        label: permissions[i].codename
      })
    }
    this.permissionsList = data
  },
  computed: {
    ...mapState([
      'permissions',
      'majorType'
    ])
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

      let params
      if (this.section === 'student') {
        params = {
          page: this.currentPage,
          grade: this.grade || '',
          major: this.major || '',
          stu_class: this.stu_class || ''
        }
      } else {
        params = {
          page: this.currentPage
        }
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
    // 处理数据
    processData (item) {
      return {
        pk: item.user.pk || null,
        created_time: item.user.date_joined || null,
        password: null,
        username: item.user.username || null,
        grade: item.grade || null,
        major: item.major || null,
        stu_class: item.stu_class || null,
        clientType: this.section === 'teacher' ? '老师' : '学生'
      }
    },
    addItem () {
      this.resetOperateForm()
      this.operateForm.created_time = new Date()
      this.isAdd = true
    },
    editItem (row) { // 打开编辑页面
      this.isEdit = true
      this.isLoading = true
      let accountInfo = editAcademyData(this.section, row.pk)
      let accountPermissions = editAcademyData(`${this.section}permission`, row.pk)
      Promise.all([accountInfo, accountPermissions])
        .then(([accountInfo, accountPermissions]) => {
          if (accountInfo.status === 200 && accountPermissions.status === 200) {
            this.operateForm = this.processData(accountInfo.data)
            this.user_permissions = accountPermissions.data.user.user_permissions.map(item => item.id)
          }
          this.isLoading = false
        })
        .catch(error => {
          this.$message.error(error)
          this.resetOperateForm()
        })
    },
    addItemSubmit () { // 确定添加纪录
      if (this.checkOperateFormValid()) {
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
                  this.$message.success('添加成功')
                }
              })
              .then(_ => this.getPageData())
              .then(_ => this.resetOperateForm())
              .catch(error => this.showError(error))
          })
          .catch(_ => {})
      }
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
                this.$message.success('删除成功')
              }
            })
            .then(_ => this.getPageData())
            .catch(error => this.showError(error))
        })
        .catch(_ => {})
    },
    editItemSubmit () {
      if (this.checkOperateFormValid()) {
        this.$confirm('确定要修改该信息吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(_ => {
            this.isLoading = true
            let params = this.getParams()
            let accountInfo = updateAcademyData(this.section, this.operateForm.pk, params)

            let accountPermissions = updateAcademyData(`${this.section}permission`, this.operateForm.pk, {
              user_permissions: this.user_permissions
            })
            return Promise.all([accountInfo, accountPermissions])
              .then(([accountInfo, accountPermissions]) => {
                if (accountInfo.status === 200 && accountPermissions.status === 200) {
                  this.$message.success('修改成功')
                }
              })
              .then(_ => this.getPageData())
              .then(_ => this.resetOperateForm())
              .catch(error => this.showError(error))
          })
          .catch(_ => {})
      }
    },
    editItemPassword (row) {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (value === null) {
            this.$message.warning('输入错误, 标签不能为空, 请重新输入')
          } else {
            let params
            this.isLoading = true
            if (this.section === 'teacher') {
              params = {
                username: row.username,
                password: value
              }
            } else {
              params = {
                username: row.username,
                password: value,
                grade: row.grade,
                major: row.major,
                stu_class: row.stu_class
              }
            }
            return updateAcademyData(this.section, row.pk, params)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success('密码修改成功')
                }
                this.isLoading = false
              })
              .catch(error => this.showError(error))
          }
        })
        .catch(_ => {})
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
          clientType: '老师'
        }
      } else {
        this.operateForm = {
          pk: '',
          created_time: '',
          username: '',
          password: '',
          grade: '',
          major: '',
          stu_class: 0,
          clientType: '学生'
        }
        this.user_permissions = []
        this.operateForm.major = this.majorType[0]
      }
    },
    showError (error) {
      this.$message.error(error.data.msg)
      console.log('error status:', error.status, 'error:', error)
      this.isLoading = false
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
    checkOperateFormValid () {
      let isValid
      this.$refs['operateForm'].validate((valid) => {
        if (valid) {
        } else {
          this.$message.warning('填入信息有误, 请按提示完成表单')
        }
        isValid = valid
      })
      return isValid
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
  .top-bar {
    .el-input__inner {
      height: 36px !important;
    }
  }
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
