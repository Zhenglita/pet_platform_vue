<template>
  <div>
      <el-card class="box-card" style="height:800px" v-if="dialog === false">
        <el-link type="primary" @click="sendMessage()"  :underline="false" icon="el-icon-edit" >请求成为博主</el-link>

          <el-empty style="height:600px" description="暂无权限"></el-empty>

        </el-card>
    <el-card style="width: 90%; margin: 10px" v-if="dialog===true">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item style="text-align: center" label-width="0">
          <el-upload
          ref="upload"
            :action=uploadUrl
            list-type="picture-card"
            :limit="1"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
          >
            <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog> -->
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.image" alt="" />
          </el-dialog> -->
        </el-form-item>
        <el-row>
            <el-col :span="12">
              <el-form-item label="标题">
          <el-input maxlength="20"
  show-word-limit v-model="form.title"></el-input>
        </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类别">
                <el-select
            v-model="addValue"
            placeholder="请选择"
            @change="addtype($event)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="form.type"></el-input> -->
        </el-form-item>
            </el-col>
          </el-row>
        <el-form-item label="内容">
          <el-input
  type="textarea"
  :autosize="{ minRows: 6, maxRows: 4}"
  placeholder="请输入内容"
  v-model="form.message">
</el-input>
          <!-- <el-input v-model="form.message"></el-input> -->
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
    <div>
      <el-dialog title="详细说明" :visible.sync="dialogFormVisible">

            <el-col :span="24" style="margin-bottom:30px;">
                <span>消息内容</span>
                <el-input v-model="message" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"/>

            </el-col>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="handleAdd()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import upload from '@/components/upload'
import { addquestAPI } from '@/api/MessageAPI'
export default {
  name: 'UserAdd',
  components: {},
  data () {
    return {
      message: '',
      dialog: true,
      dialogImageUrl: '',
      uploadUrl: '',
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        image: ''
      },
      addValue: '',
      user: {},
      options: [
        {
          value: '选项1',
          label: '哺乳类'
        },
        {
          value: '选项2',
          label: '鸟类'
        },
        {
          value: '选项3',
          label: '爬行类'
        },
        {
          value: '选项4',
          label: '鱼类'
        },
        {
          value: '选项5',
          label: '昆虫类'
        }
      ]
    }
  },
  methods: {
    async save () {
      this.form.uid = this.user.uid
      this.form.author = this.user.username
      console.log(this.form)
      const res = await request.post('/articles', this.form)
      if (res.data.flag) {
        this.$message({
          type: 'success',
          message: '发表成功'
        })
        this.$refs.upload.clearFiles()
        this.form = {}
        this.addValue = ''
        this.dialogImageUrl = ''
      } else {
        this.$message({
          type: 'error',
          message: '权限不够，请联系管理员，升级权限'
        })
      }
    },
    // handlePictureCardPreview (res) {
    //   this.ImageUrl = res.response
    //   console.log(this.ImageUrl)
    //   this.dialogVisible = true
    // },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
      console.log(fileList)
    },
    handleAvatarSuccess (event, file, fileList, row) {
      this.form.image = fileList[0].response

      // if (this.form.image === '') {
      //   this.form.image = res
      // } else {
      //   this.form.image += '&' + res
      // }
      // console.log(this.form.image)
      // this.$message.success('上传成功')
      // this.update()
    },
    sendMessage () {
      this.dialogFormVisible = true
    },
    cancel () {
      this.message = ''
      this.dialogFormVisible = false
    },
    async handleAdd () {
      const { data } = await addquestAPI(this.message)
      console.log(data)
      this.message = ''
      this.dialogFormVisible = false
      if (data.flag === false) {
        this.$message({ type: 'warning', message: '管理员正在审核您的请求，请不要重复提交！！！' })
      }
    },
    addtype (value) {
      const valueNew = this.options.find((ele) => ele.value === value).label
      this.form.type = valueNew
    }

  },
  created () {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : {}
    this.uploadUrl = upload
    if (this.user.role === 'ROLE_ADMIN') {
      this.$message({ type: 'success', message: '您好管理员！！' })
      this.dialog = true
    } else if (this.user.role === 'ROLE_BLOGGER') {
      this.$message({ type: 'success', message: '您好博主！！' })
      this.dialog = true
    } else {
      this.$message({ type: 'warning', message: '对不起您的权限不够！！请联系管理员进行升级权限' })
      this.dialog = false
    }
  },
  mounted () {

  }

}
</script>

<style lang="less" scoped></style>
