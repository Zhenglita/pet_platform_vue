<template>
   <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue"><router-link to="/Administrator/home">科普宠物知识后台管理</router-link></div>
    <div style="flex: 1"><el-button type="success" @click="$router.push('/home')">回到前台</el-button></div>
    <!-- <div style="width: 100px">

         <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/person')">个人信息</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/password')">修改密码</el-dropdown-item>
            <el-dropdown-item ><button @click="logout">退出系统</button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div> -->
<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">站内消息</el-dropdown-item>
    <!-- <el-dropdown-item command="b">修改密码</el-dropdown-item> -->
    <el-dropdown-item command="c">退出系统</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-dialog title="用户请求" :visible.sync="dialog">

      <div v-for="item in Messagelist" :key="item.from_uid" class="text item">
      <el-card class="box-card" style="margin-bottom:20px" >
        <div slot="header" class="clearfix">
          <el-avatar :src="item.imageUrl" :size="50"></el-avatar>
          <span>{{item.username}}</span>
          <div>
            <span>{{item.message}}</span>
          </div>
          <el-button style="float: right; padding: 3px 0" type="text" @click="delmessage(item.id)">马上处理</el-button>
        </div>
      </el-card>
    </div>

</el-dialog>

  </div>
</template>

<script>
import request from '@/utils/request'
import { getquestAPI, delMessageAPI } from '@/api/MessageAPI'
export default {
  name: 'AdminHeader',
  data () {
    return {
      Messagelist: [],
      user: {},
      dialog: false
    }
  },
  methods: {
    async delmessage (val) {
      const { data } = await delMessageAPI(parseInt(val))
      console.log(data)
      this.getMessage()
    },
    logout () {
      // 1.去除token，重新登录
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
      // 2.跳转login
      this.$router.push('/login')
    },
    async getMessage () {
      const { data } = await getquestAPI()
      console.log(data.data)
      this.Messagelist = data.data
      this.dialog = true
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
      if (command === 'c') {
        // 1.去除token，重新登录
        this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
        const username = this.user.username
        request.get('/users/remove/' + username)
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        // 2.跳转login
        this.$router.push('/')
        this.$message('退出系统')
      } else if (command === 'a') {
        this.getMessage()
        this.$message('查看信息')
      } else if (command === 'b') {
        // this.$message('b')
      }
    }
  },
  created () {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    console.log(this.user)
  }
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
