<template lang="html">
  <div class="page modified-info" v-if="isLogin">

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

    <el-card class="page-container">

      <div class="tablePage" v-show="!isEdit && !isAdd">
        <el-table
          :data="Users"
          border
          style="width: 100%;color:#333;">
          <el-table-column
            fixed
            prop="createDate"
            label="创建日期"
            sortable>
          </el-table-column>
          <el-table-column
            prop="grade"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="major"
            label="专业">
          </el-table-column>
          <el-table-column
            prop="banJi"
            label="班级">
          </el-table-column>
          <el-table-column
            prop="username"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码">
          </el-table-column>
          <el-table-column
            prop="clientType"
            label="账户类型"
            width="200"
            :formatter="changeClientTypeFormat"
            sortable>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small"><i class="iconfont icon-delete" style="color:red;font-size:30px;"></i></el-button>
              <el-button @click="editRow(scope.row, scope.$index)" type="text" size="small"><i class="iconfont icon-edit06" style="color:rgb(84, 80, 218);font-size:30px;"></i></el-button>
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
          layout="total, prev, pager, next, jumper"
          :total="totalDataNumber">
        </el-pagination>
      </div>

      <div class="editPage" v-show="isAdd^isEdit">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item label="日期" prop="createDate">
            <el-date-picker
            v-model="ruleForm.createDate"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            @change = "changeTimeFormat(ruleForm.createDate)"
            :picker-options="datePicker">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="账户类型" prop="clientType" align="left">
            <el-select v-model="ruleForm.clientType" placeholder="请选择" size="medium">
              <el-option
                v-for="item in clientType.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级" prop="grade" v-if="!ruleForm.clientType" align="left">
            <el-select v-model="ruleForm.grade" placeholder="请选择" size="medium" @change="selectTypeChange(ruleForm.grade, ruleForm.major)">
              <el-option
                v-for="item in gradeType"
                :key="item.grade"
                :label="item.grade"
                :value="item.grade">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业" prop="major" v-if="!ruleForm.clientType" align="left">
            <el-select v-model="ruleForm.major" placeholder="请选择" size="medium" @change="selectTypeChange(ruleForm.grade, ruleForm.major)">
              <el-option
                v-for="item in majorType"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="banJi" v-if="!ruleForm.clientType" align="left">
            <el-select v-model="ruleForm.banJi" placeholder="请选择" size="medium">
              <el-option
                v-for="item in banJiType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" prop="username" align="left">
            <el-input v-model="ruleForm.username" required></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" align="left">
            <el-input v-model="ruleForm.password" required></el-input>
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
export default {
  mounted () {
    this.setDefaultForm()
  },
  created () {
  },
  data () {
    return {
      majorType: {
      },
      banJiType: {
      },
      clientType: {
        options: [{
          value: 0,
          label: '学生'
        }, {
          value: 1,
          label: '老师'
        }]
      },
      ruleForm: {
        createDate: '',
        username: '',
        password: '',
        grade: '',
        major: '',
        banJi: '',
        clientType: 0
      },
      pagination: {
        currentPage: 1,
        pageSize: 6
      },
      editingRow: '',
      isEdit: false,
      isAdd: false,
      imgCount: 0,
      datePicker: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  computed: {
    Users () {
      return this.$store.state.testData.Users
    },
    totalDataNumber () {
      return this.$store.state.testData.Users.length
    },
    type () {
      return this.$store.state.testData.type
    },
    gradeType () {
      return this.$store.state.testData.type.filter(grade => grade.grade)
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    selectTypeChange (grade, major) { // 年级和班级选择器改变的时候
      for (let i in this.gradeType) {
        if (this.gradeType[i].grade === grade) {
          this.majorType = this.gradeType[i].major
          break
        }
      }
      for (let i in this.majorType) {
        if (this.majorType[i].name === major) {
          this.banJiType = this.majorType[i].banJi
          this.ruleForm.banJi = this.banJiType[0].label
          break
        }
      }
    },
    setDefaultForm () { // 设置默认的表单属性
      // 设置默认的ruleForm
      this.ruleForm.clientType = 0
      let now = new Date()
      let y = now.getFullYear() - 1 // 获取年
      this.ruleForm.grade = `${y}` // 初始化年份
      this.ruleForm.major = '计算机科学与技术' // 初始化专业
      this.majorType = this.type[this.type.length - 1].major // 初始化专业类型
      this.banJiType = this.majorType[0].banJi // 初始化专业的班级数量
      this.ruleForm.banJi = this.banJiType[0].label // 初始化班级 #1班#
    },
    addItem () {
      this.setDefaultForm()
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
      }).then(() => {
        if (this.validateForm()) {
          this.createTimeFormat()
          this.Users.push({
            createDate: this.ruleForm.createDate,
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            grade: this.ruleForm.grade,
            major: this.ruleForm.major,
            banJi: this.ruleForm.banJi,
            clientType: this.ruleForm.clientType
          })
          // uploadData
          this.resetRuleForm()
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '添加失败'
          })
        }
      }).catch(() => {
        console.log('add error!!')
      })
    },
    validateForm () { // 验证表单 还没写***********
      // 老师 1 学生 0
      if (this.ruleForm.clientType) { // 选项为老师的时候
        // 验证账号密码长度
        let username = this.ruleForm.username.length
        if (username < 3 && username > 15) { // 判断用户名长度
          this.$message({
            type: 'error',
            message: '用户名不符合规格(3-15)'
          })
          return false
        } else {
          let password = this.ruleForm.password.length
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
        let username = this.ruleForm.username.length
        if (username < 3 && username > 15) { // 判断用户名长度
          this.$message({
            type: 'error',
            message: '用户名不符合规格(3-15)'
          })
          return false
        } else {
          let password = this.ruleForm.password.length
          if (password < 3 && password > 15) { // 判断密码长度
            this.$message({
              type: 'error',
              message: '密码不符合规格(3-15)'
            })
            return false
          } else {
            if (!this.ruleForm.grade) { // 当年级为空的时候
              this.$message({
                type: 'error',
                message: '年级不能为空'
              })
              return false
            } else {
              if (!this.ruleForm.major) { // 专业为空时
                this.$message({
                  type: 'error',
                  message: '专业不能为空'
                })
                return false
              } else {
                if (!this.ruleForm.banJi) { // 班级为空时
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
    editRow (row, index) { // 打开编辑页面
      this.isEdit = true
      this.editingRow = index
      for (let key in row) {
        this.ruleForm[key] = row[key]
      } // 使当前要编辑的数据绑定在表中
    },
    deleteRow (index, rows) { // 删除记录
      this.$confirm('你确定要删除该记录！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1) // 从rows数据里删除一个
        // uploadData
      }).catch(() => {
        console.log('delete error!!')
      })
    },
    editSubmitForm (formName) {
      this.$confirm('确定要修改该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.validateForm()) {
          for (let key in this.ruleForm) {
            this.Users[this.editingRow][key] = this.ruleForm[key]
          }
          // uploadData
          this.resetRuleForm()
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
        }
      }).catch(() => {
        console.log('edit error!!')
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
    createTimeFormat () {
      let now = new Date()
      let y = now.getFullYear() // 获取年
      let m = now.getMonth() + 1 // 获取月
      let d = now.getDate() // 获取日
      let h = now.getHours() // 获取小时
      let mm = now.getMinutes() // 获取分钟
      let s = now.getSeconds() + 1 // 获取秒
      m = m < 10 ? '0' + m : m // 判断月是否大于10
      d = d < 10 ? ('0' + d) : d // 判断日期是否大10
      h = h < 10 ? '0' + h : h // 判断小时是否大10
      mm = mm < 10 ? '0' + mm : mm // 判断分钟是否大10
      s = s < 10 ? '0' + s : s // 判断秒数是否大10
      this.ruleForm.createDate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s // 返回时间格式
    },
    changeClientTypeFormat: (row, column) => {
      let type = row[column.property]
      if (type === 0) {
        return '学生'
      } else if (type === 1) {
        return '老师'
      }
    },
    uploadData () {
      // 完成更新数据
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