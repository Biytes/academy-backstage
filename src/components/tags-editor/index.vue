<template>
  <div class="tags-editor-container">
    <el-select
      v-model="selectedTags"
      @change="syncTagsList"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="请选择证书标签">
      <el-option
        v-for="item in tags"
        :key="item.name"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
    <i class="iconfont icon-plus tags-operate-icon" id="addTags" @click="operateConfirm('add')"></i>
    <i class="iconfont icon-edit tags-operate-icon" id="editTags" @click="operateConfirm('edit')"></i>
    <i class="iconfont icon-delete tags-operate-icon" id="deleteTags" @click="operateConfirm('delete')"></i>
    <el-dialog
      class="file-uploader-dialog"
      title="编辑标签"
      :visible.sync="isShowDialog"
      width="40%"
      align="left">
      <div v-loading="isLoading">
        <div v-if="dialogMode === 'add'">
          <el-row>
            <el-col :span="18" align="left">
              <el-form-item label="标签名">
                <el-input v-model="tagName" @keyup.enter="addTagSubmit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="center">
              <el-color-picker v-model="color"></el-color-picker>
            </el-col>
          </el-row>
        </div>
        <div v-if="dialogMode === 'edit'">
          <el-row>
            <el-col :span="16" align="left">
              <el-form-item label="标签名">
                <el-input v-model="tagName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" align="center">
              <el-color-picker v-model="color"></el-color-picker>
            </el-col>
          </el-row>
        </div>
        <div v-if="dialogMode === 'delete'">
          <el-select
            v-model="deletedTags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择证书标签">
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialog">取 消</el-button>
        <el-button v-if="dialogMode === 'add'"
                   type="success"
                   @click="addTagSubmit">确 定</el-button>
        <el-button v-if="dialogMode === 'edit'"
                   type="primary"
                   @click="addTagSubmit">确 定</el-button>
        <el-button v-if="dialogMode === 'delete'"
                   type="danger"
                   @click="deleteTagSubmit">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getAcademyData, addAcademyData, deleteAcademyData } from '@api/index'
export default {
  name: 'tags-editor',
  data () {
    return {
      section: 'certificatetag',
      selectedTags: [],
      deletedTags: [],
      dialogMode: '',
      isShowDialog: false,
      isLoading: false,
      tagName: null,
      color: null
    }
  },
  computed: {
    ...mapState([
      'tags'
    ])
  },
  methods: {
    getTags () {
      return getAcademyData(this.section)
        .then(res => {
          console.log(res)
          return res.data.results.map(item => {
            return {
              id: item.id,
              name: item.name,
              style: item.style
            }
          })
        })
        .then(tags => this.saveTags(tags))
        .then(_ => {
          this.isLoading = false
        })
        .catch(error => this.showError(error))
    },
    operateConfirm (mode) {
      let text
      if (mode === 'add') {
        text = '确定要添加标签吗'
      } else if (mode === 'delete') {
        text = '确定要删除标签吗'
      } else {
        text = '确定要编辑标签吗'
      }
      this.$confirm(text, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.showDialog(mode)
        })
        .catch(_ => {})
    },
    showDialog (mode) {
      this.dialogMode = mode
      this.isShowDialog = true
    },
    editItem (id) {
    },
    deleteTagSubmit () {
      let requests = []
      this.isLoading = true
      for (let i = 0; i < this.deletedTags.length; i++) {
        requests.push(deleteAcademyData(this.section, this.deletedTags[i]))
        console.log(requests)
      }
      Promise.all(requests)
        .then(_ => this.$message.success('删除成功'))
        .then(_ => this.getTags())
        .then(_ => this.resetDialog())
        .catch(error => this.showError(error))
    },
    addTagSubmit () {
      if (this.isTagExist()) {
        this.isLoading = true

        let params = {
          name: this.tagName,
          style: this.color
        }
        addAcademyData(this.section, params)
          .then(res => {
            if (res.status === 200) {
              this.$message.success('添加成功')
            }
          })
          .then(_ => this.getTags())
          .then(_ => this.resetDialog())
          .catch(error => this.showError(error))
      } else {
        this.$message.warning('标签已存在')
      }
    },
    resetDialog () {
      this.dialogMode = ''
      this.isShowDialog = false
      this.tagName = null
      this.color = null
      this.deletedTags = []
      this.selectedTags = []
    },
    syncTagsList () {
      this.$emit('update:syncTagsList', this.selectedTags)
    },
    isTagExist () {
      return this.tags.findIndex(item => item.name === this.tagName) === -1
    },
    showError (error) {
      this.$message.error(error.data.msg)
      console.log('error status:', error.status, 'error:', error)
      this.isLoading = false
    },
    initialData (selectedTags) {
      this.selectedTags = selectedTags
    },
    ...mapMutations([
      'saveTags'
    ])
  }
}

</script>

<style lang="scss" scoped>
.tags-editor-container {
  text-align: left;
}
.el-select {
  width: 450px;
}
.el-form-item__label {
  width: 60px;
}
.tags-operate-icon {
  display: inline-block;
  background: #E9ECEF;
  padding: 0 10px;
  vertical-align: top;
  cursor: pointer;
  font-size: 20px;
  color: #495057;
  font-weight: bold;
  border-radius: 0.25rem;
  box-shadow: 0 2px 50px #E9ECEF;
  &:hover {
    color:rgb(37, 36, 36);
  }
}

.iconfont.icon {
  &-plus {
    color: #495057;
  }

  &-delete {
    color: red;
  }

  &-edit {
    color:rgb(84, 80, 218);
  }
}
</style>
