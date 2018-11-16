<template lang="html">
  <div class="file-uploader">
    <el-dialog
      class="file-uploader-dialog"
      title="上传文件"
      :visible.sync="isShowUploadDialog"
      width="36%"
      align="left">
      <div v-loading="isLoading">
        <div class="upload-input">
          <i class="iconfont icon-file"></i>
          <span style="margin-left: 10px;">{{ fileName }}</span>
          <div style="display: inline-block" class="upload-input-button">
            <input type="file" id="file" @change="changeFile"/>
            <label for="file">Pre Upload</label>
          </div>
        </div>

        <div style="margin-top: 35px;">
          <span style="font-weight: bold">文件名：</span>
          <el-input placeholder="请输入文件名" v-model="fileName" style="margin-top: 10px;"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowUploadDialog = false">取 消</el-button>
        <el-button type="primary" @click="uploadFileSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="file-uploader-list">
      <div class="file-uploader-trigger">
        <input type="file"/>
        <label class="upload-button" @click="showUploadDialog">upload file<i class="iconfont icon-file"></i></label>
      </div>
      <div class="file-uploader-items">
        <ul>
          <li class="uploaded-item"
              v-for="(file, index) in files" :key="index">
            <i class="iconfont icon-file uploaded-item-logo"></i>
            <span class="uploaded-item-name">{{ file.name }}</span>
            <i class="iconfont icon-delete-x uploaded-item-delete"
               @click="deleteItem(index)"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'file-uploader',
  props: [],
  data () {
    return {
      size: '',
      files: [],
      fileName: '',
      file: null,
      tempFile: null,
      isShowUploadDialog: false,
      isLoading: false
    }
  },
  computed: {
    processedFileArray () {
      return this.files.map(item => item.id)
    },
    ...mapState([
      'userInfo'
    ])
  },
  mounted () {
  },
  methods: {
    changeFile (e) {
      console.log(e)
      // 获取img blob 格式 URL
      var file = e.target.files[0] // 也可以用下面的形式/
      // var file = this.$refs['certicification_pic'].files[0]

      this.tempFile = file
      this.fileName = file.name
      console.log(file)
    },
    showUploadDialog () {
      this.isShowUploadDialog = true
    },
    resetUploadDialog () {
      this.isShowUploadDialog = false
      this.file = ''
      this.fileName = ''
      this.isLoading = false
    },
    deleteItem (index) {
      this.files.splice(index, 1)
      this.$emit('update:syncFileList', this.processedFileArray)
    },
    uploadFileSubmit () {
      this.isLoading = true
      // create params
      let params = new FormData()
      params.append('file', this.tempFile)
      params.append('name', this.fileName)

      // set config
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + this.userInfo.token}
      }

      // action
      this.axios.post('https://schooltest.zunway.pw/api/v1/attachfile', params, config)
        .then(res => {
          if (res.status === 200) {
            this.files.push(res.data)
            this.$emit('update:syncFileList', this.processedFileArray)
          }
        })
        .then(_ => {
          this.$message.success('上传成功')
          this.resetUploadDialog()
        })
        .catch(error => {
          this.$message.error('上传失败')
          console.log(error)
          this.isLoading = false
        })
    },
    initialData (files) {
      this.files = files
    }
  }
}
</script>

<style lang="scss" scoped>
.file-uploader {
  width: 400px;
  padding: 0 10px;
  box-sizing: border-box;
  height: auto;
  line-height: normal;

  &-dialog {
    .upload-input {
      background: #E9ECEF;
      position: relative;
      .icon-file {
        display: inline-block;
        color: #495057;
        padding: 6px 16px;
        border-radius: 0.25rem;
        border: 1px solid #ced4da;
      }

      &-button {
        input {
          display: none;
        }
        label {
          display: inline-block;
          background: #007BFF;
          padding: 6px 16px;
          border-radius: 0.25rem;
          color: #fff;
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
    }
  }
  &-trigger {
    input[type="file"] {
      height: 0;
      overflow: hidden;
      width: 0;
    }

    input[type="file"] + label {
      background: #f15d22;
      border: none;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-family: 'Poppins', sans-serif;
      font-size: inherit;
      font-weight: 600;
      margin-bottom: 1rem;
      outline: none;
      padding: 0.8rem 45px;
      width: 100%;
      position: relative;
      transition: all 0.3s;
      vertical-align: middle;

      &:hover {
        background-color: darken(#f15d22, 10%);
      }

      &.upload-button {
        background-color: #f79159;
        box-shadow: 0 6px darken(#f79159, 10%);
        transition: none;

        &:hover {
          box-shadow: 0 4px darken(#f79159, 10%);
          top: 2px;
        }
        i {
          margin-left: 10px;
        }
      }
    }

  }

  &-items {
    .uploaded-item {
      display: block;
      padding: 5px;
      box-sizing: border-box;
      transition: all 0.33s;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0 6px #007Acc;
        border-radius: 6px;
      }

      &-logo {
        color: #007Acc;
      }

      &-name {
        margin-left: 10px;
      }
      &-delete {
        float:right;
        font-size: 20px;
        color: #999;
        &:hover {
          color:red;
        }
      }
    }
  }
}

</style>
