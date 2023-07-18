<template>
  <div class="login_container">
    <div class="title">
      <h1>宠物论坛</h1>
    </div>
    <vue-particles color="#409EFF" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" :particleSize="6" linesColor="#409EFF" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <div class="login_box" v-if="loginstate">
      <div class="avatar_box">
        <img src="@/assets/cat.png" alt="">
      </div>

      <el-form :model="userForm" status-icon ref="userForm" label-width="0px" class="login_in">
        <h1>用户登录</h1>
        <el-form-item>
          <el-input type="text" v-model="userForm.username" prefix-icon="el-icon-user" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item prop="Pass">
          <el-input type="password" v-model="userForm.password" autocomplete="off" prefix-icon="el-icon-thumb" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="adminenter">管理员登录</el-button>
          <el-button @click="register">注册</el-button>
          <!-- <el-button @click="test">test</el-button>
          <el-button @click="test1">test1</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="register_box" v-if="registerstate">

      <el-form :model="userForm" status-icon ref="userForm" label-width="0px" class="login_in" >

        <h1>用户注册</h1>

        <el-form-item>
          <el-input type="text" v-model="userForm.username" prefix-icon="el-icon-user" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item prop="Pass">
          <el-input type="text" v-model="userForm.email" prefix-icon="el-icon-thumb" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="Pass">
          <el-input type="password" v-model="userForm.password" autocomplete="off" prefix-icon="el-icon-thumb" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="to_login">返回登录</el-button>
          <el-button @click="add">注册</el-button>
          <!-- <el-button @click="test">test</el-button>
          <el-button @click="test1">test1</el-button> -->
        </el-form-item>
      </el-form>
    </div>
 <div class="admin_box" v-if="adminstate">
      <div class="avatar_box">
        <img src="@/assets/dog.png" alt="">
      </div>
      <el-form :model="userForm" status-icon ref="userForm" label-width="0px" class="login_in">

        <h1>管理员登录</h1>

        <el-form-item>
          <el-input type="text" v-model="userForm.username" prefix-icon="el-icon-user" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item prop="Pass">
          <el-input type="password" v-model="userForm.password" prefix-icon="el-icon-thumb" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="to_login">返回登录</el-button>
          <el-button @click="reset">进入管理系统</el-button>
          <!-- <el-button @click="test">test</el-button>
          <el-button @click="test1">test1</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLoginAPI, getAdminLoginAPI } from '@/api/loginAPI'
import request from '@/utils/request'
// import websocket from '@/views/home6/websocket'
import WebAdminSocket from './chatManage/webadminsocket'
let socket
export default {
  name: 'MyLogin',
  data () {
    return {
      loginstate: true,
      registerstate: false,
      adminstate: false,
      user: {},
      WebAdminSocketUrl: '',
      userForm: {
        username: '',
        password: '',
        email: ''
      },
      type: {
        uid: '3',
        username: '123123'
      }
    }
  },
  created () {
    this.WebAdminSocketUrl = WebAdminSocket
  },
  methods: {
    adminenter () {
      this.loginstate = false
      this.adminstate = true
      this.userForm = {}
    },
    async add () {
      const { data } = await request.post('/users', this.userForm)
      console.log(data)
      if (data.flag) {
        this.$message.success('注册成功，请返回登录')
        this.userForm = {}
      } else {
        this.$message.error('注册失败,用户名已存在')
      }
      this.userForm = {}
    },
    async reset () {
      const res = await getAdminLoginAPI(
        this.userForm.username,
        this.userForm.password
      )
      console.log(res)
      if (res.data.flag) {
        console.log(res)
        // 成功则存储token,格式为Bearer
        // localStorage.setItem('user', res.data.data)
        sessionStorage.setItem('user', res.data.data)
        sessionStorage.setItem('token', res.data.things)
        this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
        const username = this.user.username
        if (typeof (WebAdminSocket) === 'undefined') {
          console.log('您的浏览器不支持WebAdminSocket')
        } else {
          console.log('您的浏览器支持WebAdminSocket')
          const socketUrl = this.WebAdminSocketUrl + username
          if (socket != null) {
            socket.close()
            socket = null
          }
          // 开启一个WebAdminSocket服务
          socket = new WebSocket(socketUrl)
          // 打开事件
          socket.onopen = function () {
            console.log('WebAdminSocket已打开')
          }
        }
        // 跳转后台
        this.$router.push('/Administrator')
      } else {
        // 登录失败
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        console.log('111')
        console.log(this.username)
        this.$message.error('管理员登录失败,密码错误或者权限不够')
      }
    },
    register () {
      this.loginstate = false
      this.registerstate = true
      this.userForm = {}
    },
    to_login () {
      this.loginstate = true
      this.registerstate = false
      this.adminstate = false
      this.userForm = {}
    },
    async test1 () {
      this.$router.push('/index')
    },
    async login () {
      const res = await getLoginAPI(
        this.userForm.username,
        this.userForm.password
      )
      console.log(res)
      if (res.data.flag) {
        console.log(res)
        // 成功则存储token,格式为Bearer
        // localStorage.setItem('user', res.data.data)
        sessionStorage.setItem('user', res.data.data)
        sessionStorage.setItem('token', res.data.things)
        this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
        const username = this.user.username
        if (typeof (WebAdminSocket) === 'undefined') {
          console.log('您的浏览器不支持WebAdminSocket')
        } else {
          console.log('您的浏览器支持WebAdminSocket')
          const socketUrl = this.WebAdminSocketUrl + username
          if (socket != null) {
            socket.close()
            socket = null
          }
          // 开启一个WebAdminSocket服务
          socket = new WebSocket(socketUrl)
          // 打开事件
          socket.onopen = function () {
            console.log('WebAdminSocket已打开')
          }
          // // 关闭事件
          // socket.onclose = function () {
          //   console.log('WebAdminSocket已关闭')
          // }
        }
        const h = this.$createElement
        this.$notify({
          title: '登录成功',
          message: h('i', { style: 'color: teal' }, '欢迎回来，尊贵的' + username + '用户'),
          offset: 100
        })
        // 跳转前台
        this.$router.push('/home')
      } else {
        // 登录失败
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        console.log('111')
        console.log(this.username)
        this.$message.error('登录失败,密码或者用户名错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  color: #fff;
  size: 18px;
  width: 180px;
  left: 45.5%;
  top: 0%;
  position: absolute;
}
.login_container {
  background-color: #151616;
  display: flex;
  height: 99.52%;
}
.admin_box{
  width: 450px;
  height: 320px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  }

.login_box {
  width: 450px;
  height: 320px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.register_box {
  width: 450px;
  height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btns {
  display: flex;
  justify-content: flex-end;
}

.login_in {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
