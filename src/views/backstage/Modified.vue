<template lang="html">
  <div class="whole-wrapper">
    <div class="top-bar">
      <el-button @click="addItem" type="text" size="small"  style="float:right;cursor:pointer;margin-right:10px;"><i class="iconfont icon-plus" style="font-size:24px"></i></el-button>
      <el-button @click="back" type="text" size="small" style="float:left;cursor:pointer;margin-left:10px;color:#333;"><i class="iconfont icon-arrowsleftline" style="font-size:24px"></i></el-button>
    </div>
    <div class="container">
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
        label="年级"
        width="60">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="banJi"
        label="班级"
        width="60">
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
        width="80"
        :formatter="changeClientTypeFormat">
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
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalDataNumber">
    </el-pagination>
      </div>
      <div class="editPage" v-show="isAdd^isEdit">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="日期" prop="createDate">
            <el-date-picker
            v-model="ruleForm.createDate"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            @change = "changeTimeFormat(ruleForm.createDate)"
            :picker-options="datePicker">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-select v-model="ruleForm.grade" placeholder="请选择" size="medium">
              <el-option
                v-for="item in gradeType.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-select v-model="ruleForm.major" placeholder="请选择" size="medium">
              <el-option
                v-for="item in majorType.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="banJi">
            <el-input v-model="ruleForm.banJi" required></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" required></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" required></el-input>
          </el-form-item>
          <el-form-item label="账户类型" prop="clientType">
            <el-select v-model="ruleForm.clientType" placeholder="请选择" size="medium">
              <el-option
                v-for="item in clientType.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-button v-show="!isAdd" type="success" @click="editSubmitForm('ruleForm')">完成</el-button>
          <el-button v-show="isAdd" type="success" @click="addItemSubmit('ruleForm')">添加</el-button>
          <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
  </el-form>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  mounted () {
  },
  created () {
  },
  data () {
    return {
      gradeType: {
        options: [{
          value: '2014',
          label: '2014'
        }, {
          value: '2015',
          label: '2015'
        }, {
          value: '2016',
          label: '2016'
        }, {
          value: '2017',
          label: '2017'
        }, {
          value: '2018',
          label: '2018'
        }],
        value: ''
      },
      majorType: {
        options: [{
          value: '计算机科学与技术',
          label: '计算机科学与技术'
        }, {
          value: '软件工程',
          label: '软件工程'
        }, {
          value: '网络工程',
          label: '网络工程'
        }],
        value: ''
      },
      clientType: {
        options: [{
          value: 0,
          label: '学生'
        }, {
          value: 1,
          label: '老师'
        }],
        value: ''
      },
      ruleForm: {
        createDate: '',
        username: '',
        password: '',
        grade: '',
        major: '',
        banJi: '',
        clientType: ''
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
    }
  },
  methods: {
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
      }).then(() => {
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
      }).catch(() => {
      })
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
      })
    },
    editSubmitForm (formName) {
      this.$confirm('确定要修改该信息吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let key in this.ruleForm) {
          this.Users[this.editingRow][key] = this.ruleForm[key]
        }
        // uploadData
        this.resetRuleForm()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
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
    changeTimeFormat (time) {
      var date = new Date(time)
      var y = date.getFullYear() // 获取年
      var m = date.getMonth() + 1 // 获取月
      var d = date.getDate() // 获取日
      m = m < 10 ? '0' + m : m // 判断月是否大于10
      d = d < 10 ? ('0' + d) : d // 判断日期是否大10
      this.ruleForm.createDate = y + '-' + m + '-' + d // 返回时间格式
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

<style lang="css">
.whole-wrapper{
  width:100%;
}
.el-form-item__content{
  text-align: left;
}
.el-table th{
  text-align: center;
}
.el-pagination{
  margin-top: 20px;
  margin-bottom: 10px;
}
.el-table--border{
  box-shadow: 0px 0px 8px rgba(66, 61, 61, 0.76);
  border-radius: 8px;
}
.el-table__header-wrapper{
  border-bottom: 1px solid grey;
}
.el-table thead{
  color: #333;
}
ul.el-upload-list > li.el-upload-list__item
{
  width: 155px;
  height:155px;
  float: left;
}
div[tabindex="0"].el-upload--picture-card{
  width: 155px;
  height:155px;
  float: left;
}
@media (min-width: 1200px) and (max-width: 1366px) {
  .container{
    width: calc(100% - 165px)
  }
}

</style>
