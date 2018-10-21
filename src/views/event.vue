<template lang="html">
  <div class="page event-info" v-if="isLogin">

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
          :data="events"
          border
          style="width: 100%;color:#333;">
          <el-table-column
            fixed
            prop="title"
            label="标题"
            align="left"
            sortable>
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间"
            align="left">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            align="left">
          </el-table-column>
          <el-table-column
            prop="briefContent"
            label="内容简介"
            align="left">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, events)"
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDataNumber">
        </el-pagination>
      </div>

      <div class="editPage" v-show="isAdd^isEdit">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="开始日期:" prop="startTime" align="left">
            <el-date-picker
              v-model="ruleForm.startTime"
              align="right"
              type="datetime"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH-mm-ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期:" prop="endTime" align="left">
            <el-date-picker
              v-model="ruleForm.endTime"
              align="right"
              type="datetime"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH-mm-ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标题:" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容简介:" prop="briefContent">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              v-model="ruleForm.briefContent">
            </el-input>
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
import { getCommunistInfo, addCommunistInfo, updateCommunistInfo, deleteCommunistInfo } from '@api/index'

export default {
  mounted () {

  },
  created () {
  },
  data () {
    return {
      ruleForm: {
        title: '',
        startTime: '',
        endTime: '',
        briefContent: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 6
      },
      pageevents: [],
      editingRow: '',
      isEdit: false,
      isAdd: false
    }
  },
  computed: {
    events () {
      return this.$store.state.testData.events
    },
    totalDataNumber () {
      return this.$store.state.testData.events.length
    },
    isLogin () {
      return this.$store.state.isLogin
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
      })
        .then(() => {
          // TODO 添加一条信息
          // this.addEventInfo()
          this.events.push({
            title: this.ruleForm.title,
            startTime: this.ruleForm.startTime,
            endTime: this.ruleForm.endTime,
            briefContent: this.ruleForm.briefContent
          })
          // uploadData
          this.resetRuleForm()
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        })
        .catch(error => {
          console.log(error)
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
        // TODO deleteEventInfo() 传id
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
        // TODO updateEventInfo(params) 传id 和各个数据
        for (let key in this.ruleForm) {
          this.events[this.editingRow][key] = this.ruleForm[key]
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
    changeTimeFormat () {
      // let date = new Date(this.ruleForm.date)
      // let now = new Date()
      // let y = date.getFullYear() // 获取年
      // let m = date.getMonth() + 1 // 获取月
      // let d = date.getDate() // 获取日
      // let h = now.getHours() // 获取小时
      // let mm = now.getMinutes() // 获取分钟
      // let s = now.getSeconds() + 1 // 获取秒
      // m = m < 10 ? '0' + m : m // 判断月是否大于10
      // d = d < 10 ? ('0' + d) : d // 判断日期是否大10
      // h = h < 10 ? '0' + h : h // 判断小时是否大10
      // mm = mm < 10 ? '0' + mm : mm // 判断分钟是否大10
      // s = s < 10 ? '0' + s : s // 判断秒数是否大10
      // this.ruleForm.date = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s // 返回时间格式
      console.log(this.ruleForm.startTime)
    },
    ...mapMutations([
      'loading'
    ])
  }
}
</script>

<style lang="scss" scoped>

.page.event-info {
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
