<template lang="html">
  <div class="whole-wrapper">
    <div class="top-bar">
      <el-button @click="addItem" type="text" size="small"  style="float:right;cursor:pointer;margin-right:10px;"><i class="iconfont icon-plus" style="font-size:24px"></i></el-button>
      <el-button @click="back" type="text" size="small" style="float:left;cursor:pointer;margin-left:10px;color:#333;"><i class="iconfont icon-arrowsleftline" style="font-size:24px"></i></el-button>
    </div>
    <div class="container">
      <div class="tablePage" v-show="!isEdit && !isAdd">
        <el-table
      :data="tableData"
      border
      style="width: 100%;color:#333;">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="briefContent"
        label="内容简介"
        min-width="350">
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
          <el-form-item label="日期" prop="date" style="text-align: left;">
            <el-date-picker
            v-model="ruleForm.date"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            @change = "changeTimeFormat()"
            :picker-options="datePicker">
            </el-date-picker>
          </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" required></el-input>
    </el-form-item>
    <el-form-item label="内容简介" prop="briefContent">
      <el-input
  type="textarea"
  :autosize="{ minRows: 6, maxRows: 6}"
  placeholder="请输入内容"
  v-model="ruleForm.briefContent">
</el-input>
    </el-form-item>
    <el-form-item label="简介" prop="content">
      <el-input v-model="ruleForm.content"></el-input>
    </el-form-item>
    <el-form-item>
      <div id="editor" style="text-align:left"></div>
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
import E from 'wangeditor'
export default {
  mounted () {
    var editor = new E('#editor')
    editor.customConfig.showLinkImg = false
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.customConfig.zIndex = 100
    editor.customConfig.uploadFileName = 'pic'
    editor.customConfig.uploadImgServer = '/src/assets/img/upload-img'
    editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function (xhr, editor, result) {
        alert('fail')
      },
      error: function (xhr, editor) {
        alert('error')
        alert(xhr)
      },
      timeout: function (xhr, editor) {
        alert('time out')
      },
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        var url = result.url
        insertImg(url)
      }
    }
    editor.create()
  },
  created () {
  },
  data () {
    return {
      ruleForm: {
        title: '',
        date: '',
        briefContent: '',
        content: ''
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
    tableData () {
      return this.$store.state.testData.tableData
    },
    totalDataNumber () {
      return this.$store.state.testData.tableData.length
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
        this.tableData.push({
          title: this.ruleForm.title,
          date: this.ruleForm.date,
          briefContent: this.ruleForm.briefContent,
          content: this.ruleForm.content
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
          this.tableData[this.editingRow][key] = this.ruleForm[key]
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
