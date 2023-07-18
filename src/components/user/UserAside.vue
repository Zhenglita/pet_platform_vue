<template>

<div>
    <el-card style="width: 90%; margin: 10px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item style="text-align: center" label-width="0">
          <el-upload
              class="avatar-uploader"
              :action=uploadUrl
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
           <el-avatar v-if="form.avatar" :src="form.avatar" :size="200"></el-avatar>
            <!-- <img v-if="form.avatar" :size="50" :src="form.avatar" class="avatar" /> -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限" >
          <el-input v-model="form.role" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.place"></el-input>
        </el-form-item>
<!--        <el-form-item label="密码">-->
<!--          <el-input v-model="form.password" show-password></el-input>-->
<!--        </el-form-item>-->
        <!-- <el-form-item label="余额(￥)">
          <el-input v-model="form.account" show-password></el-input>
        </el-form-item> -->
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="update">保存</el-button>
         <el-button type="primary" @click="getvoucher">我的代金券</el-button>
      </div>
    </el-card>
<el-dialog title="我的代金券" :visible.sync="dialogVoucher" @close='cancel'>
         <el-row>
  <el-col :span="24" v-for="(o,index) in voucherFormData"  :key="index" >
 <el-card :body-style="{ padding: '0px' }">
      <div style="padding: 14px;">
        <div>
          <b>{{o.actual_value}}元代金券</b>
          <el-tag type="danger" size="mini" style="margin-left:10px">仅限图书：《{{o.bookname}}》可用</el-tag>
        </div>
        <div style="display: flex;">
           <div style="margin-top:20px">{{o.rules}}</div>
           <div style="margin-left:auto;">
           <div style="margin-left:10px;margin-top:8px"><span style="font-size:14px">拥有{{o.num}}张</span></div></div>
        </div>
        <div style="display: flex;margin-top:8px" >
          <div style="margin-left:auto;"><time class="time" style="font-size:14px">有效期：{{o.time}}全年</time>
       </div>
        </div>
      </div>
    </el-card>

  </el-col>
  </el-row>

      </el-dialog>
  </div>

</template>

<script>
import { getVoucherByUserAPI } from '@/api/VoucherAPI'
import request from '@/utils/request'
import upload from '@/components/upload'
import bus from '@/views/user/EventBus'
export default {
  name: 'UserAside',
  data () {
    return {
      form: {},
      uploadUrl: '',
      dialogVoucher: false,
      voucherFormData: []
    }
  },
  created () {
    const str = sessionStorage.getItem('user') || '{}'
    this.form = JSON.parse(str)
    this.uploadUrl = upload
    console.log(this.form.avatar)
  },
  methods: {
    handleAvatarSuccess (res) {
      console.log(res)
      this.form.avatar = res
      this.$message.success('上传成功')
      // this.update()
    },
    async update () {
      const res = await request.put('/users', this.form)
      console.log(res)
      if (res.data.flag) {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        sessionStorage.setItem('user', JSON.stringify(this.form))
        bus.$emit('unpdata', 1)
        // 触发Layout更新用户信息
      } else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    },
    async getvoucher () {
      const { data } = await getVoucherByUserAPI()
      this.voucherFormData = data.data
      this.dialogVoucher = true
    },
    cancel () {
      this.voucherFormData = []
      this.dialogVoucher = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
