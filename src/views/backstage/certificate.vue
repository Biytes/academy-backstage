<template lang="html">
  <div class="">
    <div id="shelves">
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
      <div v-for="(shelf, shelfIndex) in shelves" :key="shelfIndex" class="shelf" v-show="!addPage && !editPage">
        <h3 class="shelf-name clearfloat">{{shelf.shelfName}}
          <div class="shelf-mode-change">
            <span :class="{'shelf-mode-active': !shelf.editShelfMode}" @click="readMode(shelf)">Read</span>/
            <span :class="{'shelf-mode-active': shelf.editShelfMode}" @click="editMode(shelf)">Edit</span>
          </div>
        </h3>
        <ul class="shelf-inner">
          <li v-for="(item, itemIndex) in shelf.Items" :key="itemIndex"  class="shelf-item">
            <div class="shelf-item-info">
              <img @click="showPic(item.imgUrl)" class="item-img" :src="item.imgUrl" alt="">
              <p class="item-name">
                {{item.name}}
              </p>
              <p class="item-owner clearfloat">
                {{item.owner}}
                <i class="item-detail-icon iconfont icon-detail" title="详情" @click="showDescription(item)" v-show="!shelf.editShelfMode"></i>
                <a :href="item.imgUrl" download><i class="item-download-icon iconfont icon-download" title="下载" v-show="!shelf.editShelfMode"></i></a>
                <i class="item-edit-icon iconfont icon-edit" title="编辑" @click="editItem(shelf, itemIndex)" v-show="shelf.editShelfMode"></i>
                <i class="item-delete-icon iconfont icon-delete" title="删除" @click="deleteItem(shelf, itemIndex)" v-show="shelf.editShelfMode"></i>
              </p>
              <p class="item-time clearfloat">获奖时间:<span>{{item.awardTime}}</span></p>
              <div class="item-tags">                             <!--明天改-->
                <span v-for="(tag, tagIndex) in tagsColor" v-show="contains(item.tags, tag.name)" :key="tagIndex" :style="tag.style" class="item-tag">{{tag.name}}</span>
              </div>
            </div>
          </li>
          <li id="shelf-add-item" @click="showShelfAddItemPage(shelf)" v-show="shelf.editShelfMode">+</li>
        </ul>
      </div>
      <div v-show="addPage || editPage">
        <form id="add-page" action="index.html" method="post">
          <div><label>证书名称:</label><input type="text" v-model="addForm.name" class="custom__input"/></div>
          <div><label>获奖得主:</label><input type="text" v-model="addForm.owner" class="custom__input"/></div>
          <div><label>得奖时间:</label>
            <el-date-picker
        v-model="addForm.awardTime"
        align="right"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        :picker-options="datePicker">
      </el-date-picker></div>
          <div>
            <label class="image-upload-text">上传图片:</label><label for="imgUrl" class="image-upload"><img id="showImg" :src="addForm.imgUrl" alt=""></label>
            <input id="imgUrl" @change="changepic" type="file" ref="certicification_pic" />
          </div>
          <div style="margin-top: 20px">
            <label>证书类型:</label>
            <el-checkbox-group v-model="addForm.tags" size="medium" style="display: inline-block;">
              <el-checkbox-button v-for="tag in tags" :label="tag" :key="tag">{{tag}}</el-checkbox-button>
            </el-checkbox-group>
            <i class="iconfont icon-plus" id="addTags" @click="addTags()"></i>
          </div>
          <div>
            <label class="item-description-text">证书描述:</label>
            <textarea type="text" class="custom__input" v-model="addForm.description"/>
          </div>
          <el-row>
            <el-button type="success" style="width:45%;" @click="shelfAddItem()" v-show="addPage">添加</el-button>
            <el-button type="success" style="width:45%;" @click="shelfEditItem()" v-show="editPage">完成</el-button>
            <el-button type="warning" style="width:45%;" @click="backToRead()">返回</el-button>
          </el-row>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
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
      tags: ['LQB', 'ACM', '广州', '深圳'],
      tagsColor: [{
        name: 'ACM',
        style: {
          background: 'rgb(231, 172, 251)'
        }
      }, {
        name: 'LQB',
        style: {
          background: 'rgb(65, 179, 244)'
        }
      }, {
        name: '深圳',
        style: {
          background: 'rgb(87, 119, 209)'
        }
      }, {
        name: '广州',
        style: {
          background: 'rgb(207, 90, 48)'
        }
      }],
      addForm: {
        name: '',
        owner: '',
        awardTime: '',
        imgUrl: '',
        tags: [''],
        description: ''
      },
      addPage: false,
      editPage: false,
      editingShelfId: '',
      editingItemIndex: '',
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
    shelves () {
      console.log(this.$route.params.id) // 利用id获取需要的数据
      return this.$store.state.testData.shelves
    },
    currentImg () {
      return this.$store.state.testData.currentImg
    },
    imgPage () {
      return this.$store.state.testData.imgPage
    }
  },
  methods: {
    selectChange () {
      // 通过这个val 来判断
    },
    showPic (url) {
      this.$store.state.testData.imgPage = true
      this.$store.state.testData.currentImg = url
    },
    readMode (shelf) {
      shelf.editShelfMode = false
      console.log(shelf.editShelfMode)
    },
    editMode (shelf) {
      shelf.editShelfMode = true
      console.log(shelf.editShelfMode)
    },
    showShelfAddItemPage (shelf) {
      this.$confirm('添加新证书', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showAddPage(shelf)
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
    showAddPage (shelf) {
      this.addPage = true
      this.editPage = false
      this.editingShelfId = shelf.id
    },
    shelfAddItem () {
      this.$confirm('确定要添加新证书吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.shelves[this.editingShelfId].Items.push({ // 赋值
          name: this.addForm.name,
          owner: this.addForm.owner,
          awardTime: this.addForm.awardTime,
          imgUrl: this.addForm.imgUrl,
          tags: this.addForm.tags,
          description: this.addForm.description
        })
        // 清除
        this.clearForm()
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }).catch(() => {
      })
    },
    shelfEditItem () {
      this.$confirm('确定保存本次编辑吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var shelfId = this.editingShelfId
        var itemId = this.editingItemIndex
        for (let key in this.addForm) {
          this.shelves[shelfId].Items[itemId][key] = this.addForm[key]
        } // 遍历属性赋值
        // 清除
        this.clearForm()
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      }).catch(() => {
      })
    },
    clearForm () {
      this.addPage = false
      this.editPage = false
      this.addForm.name = ''
      this.addForm.owner = ''
      this.addForm.awardTime = ''
      this.addForm.imgUrl = ' '
      this.addForm.tags = ['']
      this.addForm.description = ''
    },
    addTags () {
      this.$prompt('请输入新标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        console.log(value)
        if (value === null) {
          this.$message({
            type: 'warning',
            message: '输入错误, 标签不能为空, 请重新输入'
          })
        } else {
          this.tags[this.tags.length] = value
          this.tagsColor.push({
            name: value,
            style: 'background:' + this.randomColor()
          })
          this.$message({
            type: 'success',
            message: '新标签是: ' + value
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    backToRead () {
      this.addPage = false
      this.editPage = false
      this.addForm.name = ''
      this.addForm.owner = ''
      this.addForm.awardTime = ''
      this.addForm.imgUrl = ' '
      this.addForm.tagArray = ['ACM']
      this.addForm.description = ''
      this.editingItemIndex = ''
      this.editingShelfId = ''
    },
    contains (arr, obj) {
      var i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
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
      this.addForm.imgUrl = url
    },
    // changeTimeFormat () {
    //   var date = new Date(this.addForm.awardTime)
    //   var y = date.getFullYear() // 获取年
    //   var m = date.getMonth() + 1 // 获取月
    //   var d = date.getDate() // 获取日
    //   m = m < 10 ? '0' + m : m // 判断月是否大于10
    //   d = d < 10 ? ('0' + d) : d // 判断日期是否大10
    //   this.addForm.awardTime = y + '-' + m + '-' + d // 返回时间格式
    // },
    editItem (shelf, index) {
      this.$confirm('确定要编辑证书吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.editingShelfId = shelf.id
        this.editingItemIndex = index
        for (let key in this.addForm) {
          this.addForm[key] = shelf.Items[index][key]
        } // 遍历属性
        this.editPage = true
      }).catch(() => {
      })
    },
    deleteItem (shelf, index) {
      this.$confirm('确定要删除证书吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(index)
        shelf.Items.splice(index, 1)
      }).catch(() => {
      })
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
    }
  }
}
</script>

<style lang="css">
#shelves{
  text-align: left;
}
.shelf{
  font-family: "Microsoft Yahei";
  font-size: 16px;
  padding: 10px;
  width:90%;
  margin: 0 auto;
}
.shelf ul{
  list-style:none;
  margin: 0;
  padding:0;
  text-align: left;
}
.shelf a{
  text-decoration: none;
}
.shelf-name{
  font-size: 24px;
  padding:5px;
  border-bottom: 3px solid rgb(230, 121, 52);
}
.shelf-mode-change{
  float: right;
}
.shelf-mode-change span{
  display: inline-block;
  margin: 0 3px;
  padding: 2px;
  cursor: pointer;
}
.shelf-mode-change span:hover{
  background: rgb(230, 121, 52);
  color:#fff;
}
.shelf-mode-active{
  background: rgb(230, 121, 52);
  color:#fff;
}
.shelf-inner{

}
.shelf-item{
  display: inline-block;
  vertical-align: top;
}
.shelf-item:hover .shelf-item-info{
  box-shadow: 0 2px 50px rgba(0, 0, 0, 0.25);
}
.shelf-item-info{
  height:auto;
  padding: 15px 17px 5px;
}
.shelf-item-info .item-img{
  height:200px;
  width:auto;
}
.shelf-item-info p{
  margin:0;
}
.shelf-item-info .item-owner{
    font-size: 15px;
}
.shelf-item-info .item-name{
  text-align: left;
  margin: 5px 0;
  font-weight: bold;
}
.item-detail-icon{
  display: inline-block;
  font-size: 20px;
  vertical-align: bottom;
  cursor: pointer;
  float: right;
  color:rgb(81, 119, 235);
}
.item-download-icon{
  display: inline-block;
  font-size: 20px;
  vertical-align: bottom;
  cursor: pointer;
  float: right;
  color:rgb(212, 95, 46);
}
.item-edit-icon{
  display: inline-block;
  font-size: 20px;
  vertical-align: bottom;
  cursor: pointer;
  float: right;
  color:rgb(18, 111, 235);
}
.item-delete-icon{
  display: inline-block;
  font-size: 20px;
  vertical-align: bottom;
  cursor: pointer;
  float: right;
  color:rgb(252, 11, 11);
}
.item-time{
  width: 100%;
  font-size: 14px;
  color:rgb(159, 159, 158)
}
.item-time span{
  float: right;
}
.item-tags{
  padding: 6px 0;
  text-align: right;
}
.item-tag{
  font-size: 11px;
  display: inline-block;
  padding: 0 6px;
  border-radius: 8px;
}
#shelf-add-item{
  cursor: pointer;
  padding: 132px 88px;
  display: inline-block;
  font-size: 45px;
  color: rgb(194, 194, 194);
  text-align: center;
  border: 2px dashed rgb(194, 194, 194);
}
#shelf-add-item:hover{
  border: 2px dashed #000;
  color: #000;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0
}
.clearfloat {
  zoom: 1
}
#add-page {
  text-align: left;
  padding-left: 55px;
}
#add-page > div{
  margin: 15px auto;
  width: 80%;
}
#add-page > div > label{
  margin-right: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 18px;
}
.img-container{
  width: calc(80% - 55px);
  padding-left: 55px;
  text-align: left;
}
.item-description-text + .custom__input{
  height:150px;
}
#add-page .custom__input{
  width: 80%;
  box-shadow: 0px 6px 10px 7px rgba(0, 0, 0, 0.1);
}
input[type="file"]#imgUrl{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#showImg{
  display: inline-block;
  vertical-align: bottom;
  width: 300px;
  height:300px;
}
.image-upload-text,.item-description-text{
  vertical-align: top;
}
.image-upload{
  display: inline-block;
  border:2px dashed grey;
  color: grey;
  vertical-align: bottom;
  position: relative;
  cursor: pointer;
}
.image-upload:after {
  content: '+';
  position: absolute;
  font-size: 2.5rem;
  color: grey;
  top: calc(50% - 1.7rem);
  left: calc(50% - 1.25rem);
  z-index: -1;
}
.image-upload:hover{
  border:2px dashed #000;
  color: #000;
}
#addTags{
  vertical-align: -webkit-baseline-middle;
  cursor: pointer;
  color:rgb(121, 124, 123);
}
#addTags:hover{
  color:rgb(37, 36, 36);
}
.description-dialog{

}
.select-name{
  font-size: 14px;
}
</style>
