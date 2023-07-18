<template>
<div class="home">
  <router-view />
</div>

</template>

<script>
import WebAdminSocket from '@/views/chatManage/webadminsocket'
let socket
export default {
  name: 'APP',
  data () {
    return {
      WebAdminSocketUrl: ''
    }
  },
  methods: {

  },
  created () {
    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    if (sessionStorage.getItem('user') != null) {
      if (user) {
        this.WebAdminSocketUrl = WebAdminSocket
        const username = user.username
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
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .app {
//   // font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   // -webkit-font-smoothing: antialiased;
//   // -moz-osx-font-smoothing: grayscale;
//   // text-align: center;
//   // color: #2c3e50;
//   // margin-top: 0px;
//   // margin: -8px -8px auto;
//     background-color: #f5f5f5;
//     width: 100%;
//     height: 1800px;
// }
.home{
height: 100%;
background-color: #151616;
}
</style>
