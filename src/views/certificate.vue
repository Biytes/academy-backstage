<template lang="html">
  <div class="page certificate">
    <div class="top-bar">
      <el-row v-if="!isClientStudent">
        <el-col style="width: 200px">
          <el-input placeholder="请输入年级"
                    v-model="grade"
                    size="mini"
                    clearable
                    @keyup.enter.native="getPageData"></el-input>
        </el-col>
        <el-col style="width: 200px; padding: 1px 0 0; margin: 0 20px">
          <el-select v-model="major" placeholder="请选择专业" size="mini" @change="getPageData()" class="left">
            <el-option
              v-for="item in majorType"
              :key="item.value"
              :label="item.title"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col style="width: 200px">
          <el-input placeholder="请输入班级"
                    v-model="stu_class"
                    size="mini"
                    clearables
                    @keyup.enter.native="getPageData">
            <template slot="append"><span>班</span></template>
          </el-input>
        </el-col>
      </el-row>
      <el-row v-else style="color: #333; padding: 0 20px;">
        {{ grade }} 级 {{ major }} 专业 {{ stu_class }} 班证书墙
      </el-row>
    </div>
    <el-card class="page-container">
      <div class="shelf" v-show="!isAddPage && !isEditPage" v-loading="isLoading">
        <h3 class="shelf-name clearfloat">
          {{ this.section }}
          <div class="shelf-mode-control">
            <span :class="{'shelf-mode-active': !isEditMode}"
                  @click="readMode">Read</span>
            <span v-if="isWrite">/</span>
            <span v-if="isWrite"
                  :class="{'shelf-mode-active': isEditMode}"
                  @click="editMode">Edit</span>
          </div>
        </h3>
        <ul class="shelf-inner">
          <li v-for="item in tableData" :key="item.id"  class="shelf-item">
            <div class="shelf-item-info">
              <img @click="showImagePage(item.imageUrl)" class="item-img" :src="item.imageUrl" alt="">
              <p class="item-name">
                {{ item.name }}
              </p>
              <p class="item-owner clearfloat">
                {{ item.owner }}
                <el-tooltip class="item" effect="dark" content="详情" placement="top">
                  <i class="item-icon-detail iconfont icon-detail" title="详情" @click="showDescription(item)" v-show="!isEditMode"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="下载" placement="top">
                  <a :href="item.imageUrl" target="_blank" download style="float: right;"><i class="item-icon-download iconfont icon-download" title="下载" v-show="!isEditMode"></i></a>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <i class="item-icon-edit iconfont icon-edit" title="编辑" @click="editItem(item.id)" v-show="isEditMode"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <i class="item-icon-delete iconfont icon-delete" title="删除" @click="deleteItemSubmit(item.id)" v-show="isEditMode"></i>
                </el-tooltip>
              </p>
              <p class="item-time clearfloat">获奖时间:<span>{{ item.awardTime }}</span></p>
              <div class="item-tags">
                <span v-for="tag in tags" v-show="contains(tag.name, item.tags)" :key="tag.id" :style="`background: ${tag.style}`" class="item-tag">{{ tag.name }}</span>
              </div>
            </div>
          </li>
          <li class="shelf-add-item"
              @click="addItem()"
              v-if="isWrite"
              v-show="isEditMode">+</li>
        </ul>
        <el-pagination
          background
          :current-page.sync="currentPage"
          :total="total"
          :page-size="pageSize"
          @current-change="getPageData"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <div v-show="isAddPage || isEditPage" v-loading="isLoading">

        <el-form :model="operateForm" label-width="100px" class="demo-ruleForm add-page">
          <el-form-item label="证书名称:" prop="name">
            <el-input v-model="operateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="获奖得主:" prop="owner">
            <el-input v-model="operateForm.owner"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade"  v-if="!isClientStudent">
            <el-input placeholder="年级" v-model="operateForm.grade"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major" align="left" v-if="!isClientStudent">
            <el-select v-model="operateForm.major" placeholder="请选择专业" class="left">
              <el-option
                v-for="(item, index) in majorType"
                v-if="index !== 0"
                :key="item.value"
                :label="item.title"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="stu_class" v-if="!isClientStudent">
            <el-input placeholder="班级" v-model="operateForm.stuClass">
              <template slot="append"><span>班</span></template>
            </el-input>
          </el-form-item>
          <el-form-item label="得奖时间:" prop="awardTime" align="left">
            <el-date-picker
              v-model="operateForm.awardTime"
              align="right"
              type="date"
              placeholder="选择日期:"
              format="yyyy年 MM月 dd日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上传图片:" prop="imageUrl" align="left">
            <image-uploader :syncImage.sync="operateForm.image"
                            ref="imageUploader"
                            width="300"
                            height="300"></image-uploader>
          </el-form-item>
          <el-form-item label="证书类型:" prop="tags">
            <tags-editor :syncTagsList.sync="operateForm.tags"
                         ref="tagsEditor"
                         :isAdd="true"
                         :isEdit="!isClientStudent"
                         :isDelete="!isClientStudent"></tags-editor>
          </el-form-item>
          <el-form-item label="证书描述:" prop="description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              v-model="operateForm.description">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" style="width:45%;" @click="addItemSubmit()" v-show="isAddPage">添加</el-button>
            <el-button type="success" style="width:45%;" @click="editItemSubmit()" v-show="isEditPage">完成</el-button>
            <el-button type="warning" style="width:45%;" @click="hideOperatePage()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAcademyData, editAcademyData, addAcademyData, updateAcademyData, deleteAcademyData } from '@api/index'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      grade: null,
      major: null,
      stu_class: null,
      tableData: [],
      section: '',
      operateForm: {
        id: '',
        image: '',
        imageUrl: '',
        name: '',
        description: '',
        awardTime: '',
        owner: '',
        grade: '',
        major: '',
        stuClass: '',
        tags: []
      },
      currentPage: 1,
      pageSize: 6,
      total: 0,
      isClientStudent: false,
      isWrite: true,
      isLoading: false,
      isAddPage: false,
      isEditPage: false,
      isEditMode: false
    }
  },
  computed: {
    ...mapState([
      'permissions',
      'userInfo',
      'majorType',
      'tags'
    ])
  },
  mounted () {
    this.section = this.$route.name
    let userInfo = this.userInfo
    if (userInfo.type === 2) {
      this.isClientStudent = true
      this.major = userInfo.major
      this.grade = userInfo.grade
      this.stu_class = userInfo.stu_class
    }
    this.checkWritePermission()
    this.getTags()
    this.getPageData()
  },
  methods: {
    getPageData () {
      // 获取页面数据
      let params = {
        page: this.currentPage,
        grade: this.grade || '',
        major: this.major || '',
        stu_class: this.stu_class || ''
      }

      return Promise
        .resolve()
        .then(_ => {
          this.isLoading = true
          return getAcademyData(this.section, params)
        })
        .then(res => {
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
    getTags () {
      this.isLoading = true
      return getAcademyData('certificatetag')
        .then(res => {
          console.log(res)
          let tags = res.data.map(item => {
            return {
              id: item.id,
              name: item.name,
              style: item.style
            }
          })
          return tags
        })
        .then(tags => {
          this.saveTags(tags)
          this.isLoading = false
        })
        .catch(error => this.showError(error))
    },
    processData (item) {
      return {
        id: item.id,
        image: item.image || null,
        imageUrl: `https://schooltest.zunway.pw/media/${item.image_url}` || null,
        name: item.name || null,
        description: item.desc || null,
        awardTime: item.award_time || null,
        owner: item.owner || null,
        grade: item.grade || null,
        major: item.major || null,
        stuClass: item.stu_class || null,
        tags: item.tags || null
      }
    },
    checkWritePermission () {
      this.isWrite = this.permissions.findIndex(item => item.codename.indexOf(this.section)) >= 0
    },
    selectChange () {
      // 通过这个val 来判断
    },
    showAddItemPage () {
      this.$confirm('添加新证书', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showAddPage()
        this.$message.success('请输入应填的信息!')
      })
    },
    showDescription (item) {
      const h = this.$createElement
      this.$msgbox({
        title: item.name + '   ' + item.owner,
        message: h('p', null, item.description),
        // [
        //   h('span', null, '内容可以是 '),
        //   h('i', { style: 'color: teal' }, 'VNode')
        // ]
        showCancelButton: true,
        confirmButtonText: '确定'
      })
    },
    readMode () {
      this.isEditMode = false
    },
    editMode () {
      this.isEditMode = true
    },
    addItem () {
      this.$confirm('确定要添加新证书吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.resetOperateForm()
          this.isAddPage = true
        })
        .catch(_ => {})
    },
    editItem (id) {
      this.isLoading = true
      this.resetOperateForm()
      this.isEditPage = true
      editAcademyData(this.section, id)
        .then(res => {
          if (res.status === 200) {
            this.operateForm = this.processData(res.data)
            this.$refs.imageUploader.catchData(this.operateForm.imageUrl)
            this.$refs.tagsEditor.initialData(this.operateForm.tags)
          }
          this.isLoading = false
        })
        .catch(error => this.showError(error))
    },
    addItemSubmit () {
      this.$confirm('确定要添加新证书吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          let params = {
            name: this.operateForm.name,
            desc: this.operateForm.description,
            image: this.operateForm.image,
            award_time: this.operateForm.awardTime,
            owner: this.operateForm.owner,
            grade: this.isClientStudent ? this.grade : this.operateForm.grade,
            major: this.isClientStudent ? this.major : this.operateForm.major,
            stu_class: this.isClientStudent ? this.stu_class : this.operateForm.stuClass,
            tags: this.operateForm.tags
          }

          return addAcademyData(this.section, params)
            .then(_ => {
              this.$message.success('添加成功')
            })
            .then(_ => this.getPageData())
            .then(_ => this.hideOperatePage())
            .catch(error => this.showError(error))
        })
    },
    editItemSubmit () {
      this.$confirm('确定要添加新证书吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          let params = {
            name: this.operateForm.name,
            desc: this.operateForm.description,
            image: this.operateForm.image,
            award_time: this.operateForm.awardTime,
            owner: this.operateForm.owner,
            grade: this.operateForm.grade,
            major: this.operateForm.major,
            stu_class: this.operateForm.stuClass,
            tags: this.operateForm.tags
          }

          return updateAcademyData(this.section, this.operateForm.id, params)
            .then(_ => {
              this.$message.success('编辑成功')
            })
            .then(_ => this.getPageData())
            .then(_ => this.hideOperatePage())
            .catch(error => this.showError(error))
        })
    },
    deleteItemSubmit (id) {
      this.$confirm('确定保存本次编辑吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.isLoading = true
          return deleteAcademyData(this.section, id)
            .then(_ => this.getPageData())
            .catch(error => this.showError(error))
        })
        .catch(_ => {})
    },
    addTags () {
      this.$prompt('请输入新标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (value === null) {
            this.$message.warning('输入错误, 标签不能为空, 请重新输入')
          } else {
            let params = {
              name: value,
              style: 'background:' + this.randomColor()
            }
            return addAcademyData('certificatetag', params)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success('标签添加成功')
                }
              })
              .then(_ => this.getTags())
              .catch(error => this.showError(error))
          }
        })
        .catch(_ => {
          this.$message('取消输入')
        })
    },
    hideOperatePage () {
      this.isAddPage = false
      this.isEditPage = false
      this.resetOperateForm()
    },
    resetOperateForm () {
      this.operateForm = {
        id: '',
        imageUrl: '',
        name: '',
        description: '',
        awardTime: '',
        owner: '',
        grade: this.isClientStudent ? this.grade : null,
        major: this.isClientStudent ? this.major : null,
        stuClass: this.isClientStudent ? this.stu_class : null,
        tags: []
      }
      this.$refs.imageUploader.clearUrl()
    },
    // 辅助函数
    contains (target, array) {
      return array.findIndex(item => item === target) >= 0
    },
    showError (error) {
      this.$message.error(error.data.msg)
      console.log('error status:', error.status, 'error:', error)
      this.isLoading = false
    },
    ...mapMutations([
      'showImagePage',
      'saveTags'
    ])
  }
}
</script>

<style lang="scss">
.page.certificate {
  text-align: left;

  .top-bar {

    .select-name{
      font-size: 14px;
    }

  }

  .shelf {
    font-family: "Microsoft Yahei";
    font-size: 16px;
    margin: 0 auto;

    &-inner {
      min-height: 328px;
    }

    &-name {
      margin: 10px 0;
      font-size: 24px;
      padding:5px;
      border-bottom: 3px solid rgb(230, 121, 52);
    }

    &-mode {
      &-control {
        float: right;

        span {
          display: inline-block;
          margin: 0 3px;
          padding: 2px;
          cursor: pointer;

          &:hover {
            background: rgb(230, 121, 52);
            color:#fff;
          }
        }
      }

      &-active {
        background: rgb(230, 121, 52);
        color:#fff;
      }
    }

    &-item {
      display: inline-block;
      vertical-align: top;

      &:hover {
        .shelf-item-info {
          box-shadow: 0 2px 50px rgba(0, 0, 0, 0.25);
        }
      }

      &-info {
        height:auto;
        padding: 15px 17px 5px;

        .item-img {
          height:250px;
          width:auto;
        }

        p {
          margin:0;
        }

        .item-owner {
          font-size: 15px;
          .iconfont {
            padding: 0 5px;
          }
        }

        .item-name {
          text-align: left;
          margin: 5px 0;
          font-weight: bold;
        }

        .item-icon {
          &-detail {
            display: inline-block;
            font-size: 20px;
            vertical-align: bottom;
            cursor: pointer;
            float: right;
            color:rgb(81, 119, 235);
          }

          &-download {
            display: inline-block;
            font-size: 20px;
            vertical-align: bottom;
            cursor: pointer;
            float: right;
            color:rgb(212, 95, 46);
          }

          &-edit {
            display: inline-block;
            font-size: 20px;
            vertical-align: bottom;
            cursor: pointer;
            float: right;
            color:rgb(18, 111, 235);
          }

          &-delete {
            display: inline-block;
            font-size: 20px;
            vertical-align: bottom;
            cursor: pointer;
            float: right;
            color:rgb(252, 11, 11);
          }
        }

        .item-time {
          width: 100%;
          font-size: 14px;
          color:rgb(159, 159, 158)

          span {
            float: right;
          }
        }

        .item-tags{
          padding: 6px 0;
          text-align: right;
          .item-tag{
            font-size: 11px;
            display: inline-block;
            padding: 0 6px;
            border-radius: 8px;
          }
        }
      }
    }

    &-add-item{
      cursor: pointer;
      padding: 132px 88px;
      display: inline-block;
      font-size: 45px;
      color: rgb(194, 194, 194);
      text-align: center;
      border: 2px dashed rgb(194, 194, 194);

      &:hover{
        border: 2px dashed #000;
        color: #000;
      }
    }
  }

  .add-page {
    text-align: left;
    padding-left: 55px;

    .item-description-text + .custom__input {
      height:150px;
    }
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}

</style>
