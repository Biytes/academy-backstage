<template lang="html">
  <div class="page certificate">
    <div class="top-bar">
      <span class="select-name">年级:</span>
      <el-select v-model="gradeType.value" placeholder="请选择" size="mini" @change="selectChange()">
        <el-option
          v-for="item in gradeType.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="select-name">专业:</span>
      <el-select v-model="majorType.value" placeholder="请选择" size="mini" @change="selectChange()">
        <el-option
          v-for="item in majorType.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="select-name">比赛类型:</span>
      <el-select v-model="awardType.value" placeholder="请选择" size="mini" @change="selectChange()">
        <el-option
          v-for="item in awardType.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
                <i class="item-icon-detail iconfont icon-detail" title="详情" @click="showDescription(item)" v-show="!isEditMode"></i>
                <a :href="item.imageUrl" download><i class="item-icon-download iconfont icon-download" title="下载" v-show="!isEditMode"></i></a>
                <i class="item-icon-edit iconfont icon-edit" title="编辑" @click="editItem(item.id)" v-show="isEditMode"></i>
                <i class="item-icon-delete iconfont icon-delete" title="删除" @click="deleteItemSubmit(item.id)" v-show="isEditMode"></i>
              </p>
              <p class="item-time clearfloat">获奖时间:<span>{{ item.awardTime }}</span></p>
              <div class="item-tags">                             <!--明天改-->
                <span v-for="tag in tags" v-show="tags.some(item => item === tag.name)" :key="tag.id" class="item-tag">{{ tag.name }}</span>
              </div>
            </div>
          </li>
          <li class="shelf-add-item"
              @click="addItem()"
              v-if="isWrite"
              v-show="isEditMode">+</li>
        </ul>
      </div>
      <div v-show="isAddPage || isEditPage" v-loading="isLoading">

        <el-form :model="operateForm" label-width="100px" class="demo-ruleForm add-page">
          <el-form-item label="证书名称:" prop="name">
            <el-input v-model="operateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="获奖得主:" prop="owner">
            <el-input v-model="operateForm.owner"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input placeholder="年级" v-model="operateForm.grade"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input placeholder="专业" v-model="operateForm.major"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="stu_class">
            <el-input placeholder="班级" v-model="operateForm.stu_class">
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
            <el-checkbox-group v-model="operateForm.tags" size="medium" style="display: inline-block;">
              <el-checkbox-button v-for="tag in tags"
                                  :label="tag.id"
                                  :key="tag.id">{{tag.name}}</el-checkbox-button>
            </el-checkbox-group>
            <i class="iconfont icon-plus" id="addTags" @click="addTags"></i>
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
      awardType: {
        options: [{
          value: 'ACM',
          label: 'ACM'
        }, {
          value: '蓝桥杯',
          label: '蓝桥杯'
        }, {
          value: '省赛',
          label: '省赛'
        }],
        value: ''
      },
      tags: [],
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
      isWrite: true,
      isLoading: false,
      isAddPage: false,
      isEditPage: false,
      isEditMode: false
    }
  },
  computed: {
    ...mapState([
      'permissions'
    ])
  },
  mounted () {
    this.section = this.$route.name

    this.checkWritePermission()
    this.getPageData()
    this.getTags()
  },
  methods: {
    getPageData () {
      // 获取页面数据
      return Promise
        .resolve()
        .then(_ => {
          this.isLoading = true
        })
        .then(_ => getAcademyData(this.section))
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            let data = res.data
            this.tableData = data.results.map(item => this.processData(item))
          }
          this.isLoading = false
        })
        .catch(error => this.showError('get', error))
    },
    getTags () {
      this.isLoading = true
      getAcademyData('certificatetag')
        .then(res => {
          this.tags = res.data.results.map(item => {
            return {
              id: item.id,
              name: item.name
            }
          })
          this.isLoading = false
        })
        .catch(error => this.showError('get Tags', error))
    },
    processData (item) {
      return {
        id: item.id,
        image: item.image,
        imageUrl: `https://schooltest.zunway.pw/media/${item.image_url}`,
        name: item.name,
        description: item.desc,
        awardTime: item.award_time,
        owner: item.owner,
        grade: item.grade,
        major: item.major,
        stuClass: item.stu_class,
        tags: item.tags
      }
    },
    checkWritePermission () {
      this.isWrite = this.permissions.findIndex(item => item.codename.indexOf(`write_${this.section}`)) >= 0
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
        this.$message({
          type: 'success',
          message: '请输入应填的信息!'
        })
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
          }
          this.isLoading = false
        })
        .catch(error => this.showError('get', error))
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
            grade: this.operateForm.grade,
            major: this.operateForm.major,
            stu_class: this.operateForm.stuClass,
            tags: this.operateForm.tags
          }

          return addAcademyData(this.section, params)
            .then(_ => {
              this.$message.success('添加成功')
            })
            .then(_ => this.getPageData())
            .then(_ => this.hideOperatePage())
            .catch(error => {
              // 失败了的话就不变，提示错误
              this.isLoading = false
              this.showError('add', error)
            })
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
            image: this.operateForm.imageUrl,
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
            .catch(error => {
              // 失败了的话就不变，提示错误
              this.isLoading = false
              this.showError('edit', error)
            })
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
            .catch(error => this.showError('delete', error))
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
            this.$message({
              type: 'warning',
              message: '输入错误, 标签不能为空, 请重新输入'
            })
          } else {
            let params = {
              name: value,
              style: 'background:' + this.randomColor()
            }
            return addAcademyData('certificatetag', params)
              .then(_ => this.$message.success('标签添加成功'))
              .then(_ => this.getTags())
              .catch(error => this.showError('add Tag', error))
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
        grade: '',
        major: '',
        stuClass: '',
        tags: []
      }
      this.$refs.imageUploader.clearUrl()
    },
    random (max, min) {
      if (typeof max !== 'number') {
        return Math.random()
      } else if (typeof min !== 'number') {
        min = 0
      }
      return Math.random() * (max - min) + min
    },
    randomColor () {
      var r = this.random(256) | 0
      var g = this.random(256) | 0
      var b = this.random(256) | 0
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    showError (type, error) {
      this.$message.error(`${type} error`)
      this.isLoading = false
      console.log(`${type} error`, error)
    },
    ...mapMutations([
      'showImagePage'
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

    .img-container {
      width: calc(80% - 55px);
      padding-left: 55px;
      text-align: left;
    }

    #addTags {
      vertical-align: -webkit-baseline-middle;
      cursor: pointer;
      color:rgb(121, 124, 123);
      &:hover {
        color:rgb(37, 36, 36);
      }
    }
  }
}

</style>
