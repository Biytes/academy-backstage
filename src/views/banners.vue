<template lang="html">
  <div class="page banners-info" v-if="isLogin">

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
          :data="tableData"
          border
          style="width: 100%;color:#333;">
          <el-table-column
            fixed
            prop="date"
            label="日期"
            align="center"
            width="200"
            sortable>
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
            prop="briefContent"
            label="内容简介"
            min-width="200"
            align="left">
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
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
        <el-pagination
          background
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalDataNumber">
        </el-pagination>
      </div>

      <div class="editPage" v-show="isAdd^isEdit">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="日期" prop="date" align="left">
            <el-date-picker
              v-model="ruleForm.date"
              align="right"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              @change = "changeTimeFormat()">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="上传图片:" prop="imageUrl" align="left">
            <label for="imgUrl" class="image-upload"><img id="showImg" :src="ruleForm.imageUrl" alt=""></label>
            <input id="imgUrl" @change="changepic" type="file" ref="certicification_pic" />
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

export default {
  mounted () {

  },
  created () {
  },
  data () {
    return {
      ruleForm: {
        title: '',
        date: '',
        imageUrl: '',
        briefContent: '',
        content: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 6
      },
      pageTableData: [],
      editingRow: '',
      isEdit: false,
      isAdd: false
    }
  },
  computed: {
    tableData () {
      return this.$store.state.testData.banners
    },
    totalDataNumber () {
      return this.$store.state.testData.tableData.length
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
          // this.addCommunistInfo()
          this.tableData.push({
            title: this.ruleForm.title,
            date: this.ruleForm.date,
            imageUrl: this.ruleForm.imageUrl,
            briefContent: this.ruleForm.briefContent,
            content: this.ruleForm.content
          })
          // uploadData
          this.resetRuleForm()
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        })
        .catch(() => {
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
        // TODO deleteCommunistInfo() 传id
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
        // TODO updateCommunistInfo(params) 传id 和各个数据
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
    changepic (e) {
      console.log(e)
      // 获取img blob 格式 URL
      var url = null
      var file = e.target.files[0] // 也可以用下面的形式/
      // var file = this.$refs['certicification_pic'].files[0]
      /* window.URL = window.URL || window.webkitURL; */
      if (window.createObjcectURL !== undefined) {
        url = window.createOjcectURL(file)
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file)
      }
      this.ruleForm.imageUrl = url
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
    ...mapMutations([
      'loading',
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

  input[type="file"]#imgUrl {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
  }
  #showImg {
    display: inline-block;
    vertical-align: bottom;
    width: 300px;
    height:300px;
  }

  .image-upload {
    display: inline-block;
    border:2px dashed grey;
    color: grey;
    vertical-align: bottom;
    position: relative;
    cursor: pointer;

    &:after {
      content: '+';
      position: absolute;
      font-size: 2.5rem;
      color: grey;
      top: calc(50% - 1.7rem);
      left: calc(50% - 1.25rem);
      z-index: 1;
    }

    &:hover {
      border:2px dashed #000;
      color: #000;
    }

    &-text,
    .item-description-text {
      vertical-align: top;
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
}
</style>
