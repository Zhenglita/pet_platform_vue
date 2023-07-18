<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{'text-align':'center'}">
      <el-table-column label="图片" width="180">
        <template v-slot="scope">
          <el-image :src="scope.row.image"></el-image>
          <!-- <img :src="scope.row.avatar" alt="" width="90" height="90"> -->
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center"> </el-table-column>
      <!-- <el-table-column prop="message" label="内容" :show-overflow-tooltip="true" align="center"> </el-table-column> -->
      <el-table-column width label="内容" align="center" prop="message">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" :content="row.message" placement="top">
              <div
                style="width:100%;padding: 0px;display: -webkit-box;-webkit-line-clamp:3;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;white-space: normal;line-height:18px;"
              >{{row.message}}</div>
            </el-tooltip>
              </template>
            </el-table-column>
      <el-table-column prop="author" label="作者" align="center"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180" align="center"> </el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleLook(scope.row)"
            >批准</el-button
          >

          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"
            >不批准</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="updata-form">
      <el-dialog :before-close="toggleDialog"
        title="文章审核推荐评价"
        :visible.sync="dialogFormVisible4Edit"
      ><div style="display:flex;margin:auto;width:100%;justify-content: center;
        align-items: center;">
        <h1>推荐等级：</h1>
        <el-rate v-model="value" show-text> </el-rate>
      </div>
<div style="display:flex;margin:auto;width:100%;justify-content: center;
        align-items: center;">
        <el-input
  type="textarea"
  :rows="6"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="handleEdit()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getAdminArticleByAdbleListAPI,
  deteleArticleAPI
} from '@/api/articleAPI'
import request from '@/utils/request'
export default {
  data () {
    return {
      tableData: [],
      dialogFormVisible4Edit: false,
      formData: {},
      value: null,
      textarea: '',
      user: ''
    }
  },
  methods: {
    async getAll () {
      const { data } = await getAdminArticleByAdbleListAPI(false)
      this.tableData = data.data
    },
    // 弹出编辑窗口
    handleLook (row) {
      this.formData = row
      this.formData.enable = true
      this.dialogFormVisible4Edit = true
    },
    toggleDialog () {
      this.formData = {}
      this.textarea = ''
      this.value = null
      this.dialogFormVisible4Edit = false
    },
    cancel () {
      this.formData = {}
      this.textarea = ''
      this.value = null
      this.dialogFormVisible4Edit = false
    },
    async handleEdit () {
      this.formData.enable_rate = this.value
      this.formData.enable_message = this.textarea
      this.formData.enable_uid = this.user.uid
      const { data } = await request.put('/articles', this.formData)
      console.log(data)
      this.textarea = ''
      this.value = null
      this.dialogFormVisible4Edit = false
      this.getAll()
    },
    // 修改
    // async handleLook (value) {
    //   this.formData = value
    //   this.formData.enable = true
    //   console.log(this.formData)
    //   const { data } = await request.put('/articles', this.formData)
    //   console.log(data)
    //   // // this.dialogFormVisible4Edit = false
    //   this.getAll()
    // },
    async handleDelete (value) {
      const { data } = await deteleArticleAPI(value.aid)
      console.log(data)
      this.getAll()
    }
  },
  created () {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : {}
    this.getAll()
  }
}
</script>

<style></style>
