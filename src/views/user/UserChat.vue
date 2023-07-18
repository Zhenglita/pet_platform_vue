<template>
  <div>
        <el-card style="height:300px;margin-bottom:30px">

    <span>请求会话</span>
    <div v-for="item in list" :key="item.uid" class="text item">
      <el-card class="box-card" style="margin-bottom:20px" v-if="item.username !==user.username">
        <div slot="header" class="clearfix">
          <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span>{{item.username}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="open(item.username)">接受对话邀请</el-button>
        </div>
      </el-card>
    </div>
</el-card>
    <el-card style="margin-bottom:20px;height:1000px">
      <span>系统消息</span>
      <div v-for="item in Messagelist" :key="item.uid" class="text item">
      <el-card class="box-card" style="margin-bottom:20px" v-if="item.username !==user.username">
        <div slot="header" class="clearfix">
          <span>{{item.message}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="delmessage(item.id)">删除消息</el-button>
        </div>
      </el-card>
    </div>
    </el-card>

    <div>

    </div>
    <el-dialog title="私聊" :visible.sync="dialogChatVisible" @close='cancel' width="60%" >
      <div style="width: 650px; margin: 0 auto; background-color: white;
                    border-radius: 5px; box-shadow: 0 0 10px #ccc">
        <div style="text-align: center; line-height: 50px;">
         正在与（{{ chatUser }}）聊天
        </div>
        <div style="height: 300px; overflow:auto; border-top: 1px solid #ccc" v-html="content"></div>
        <div style="height: 200px;margin-bottom:50px">
          <textarea v-model="text" style="height: 160px; width: 93.5%; padding: 20px; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none"></textarea>
          <div style="text-align: right; padding-right: 10px">
            <el-button type="primary" size="mini" @click="send">发送</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAPI, delAPI, getMessageAPI, delMessageAPI, downMessageAPI } from '@/api/MessageAPI'
import websocket from '@/views/user/websocket'
let socket
export default {
  name: 'UserChat',
  data () {
    return {
      circleUrl:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      user: {},
      isCollapse: false,
      users: [],
      websocketUrl: '',
      Messagelist: [],
      chatUser: '',
      text: '',
      list: [],
      messages: [],
      content: '',
      dialogChatVisible: false
    }
  },
  created () {
    this.wantChat()
    this.getMessage()
    this.websocketUrl = websocket
  },
  methods: {
    async delmessage (val) {
      const { data } = await delMessageAPI(parseInt(val))
      console.log(data)
      this.getMessage()
    },
    async getMessage () {
      const { data } = await getMessageAPI()
      this.Messagelist = data.data
    },
    async cancel () {
      const { data } = await delAPI(this.chatUser)
      console.log(data)
      this.chatUser = ''
    },
    open (toUsername) {
      this.user = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : {}
      const username = this.user.username
      const _this = this
      if (typeof WebSocket === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        console.log('您的浏览器支持WebSocket')
        const socketUrl = this.websocketUrl + username
        if (socket != null) {
          socket.close()
          socket = null
        }
        // 开启一个websocket服务
        socket = new WebSocket(socketUrl)
        // 打开事件
        socket.onopen = function () {
          console.log('websocket已打开')
          downMessageAPI()
        }
        this.chatUser = toUsername
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        socket.onmessage = function (msg) {
          console.log('收到数据====' + msg.data)
          const data = JSON.parse(msg.data) // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
          console.log(data)
          if (data.users) {
            // 获取在线人员信息
            _this.users = data.users.filter(
              (user) => user.username !== username
            ) // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
          } else if (data === 'true') {
            this.$message({ type: 'success', message: '有消息' })
          } else {
            // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
            //  // {"from": "zhang", "text": "hello"}
            if (data.from === _this.chatUser) {
              _this.messages.push(data)
              // 构建消息内容
              _this.createContent(data.from, null, data.text)
            }
          }
        }
        // 关闭事件
        socket.onclose = function () {
          console.log('websocket已关闭')
        }
        // 发生了错误事件
        socket.onerror = function () {
          console.log('websocket发生了错误')
        }
        this.dialogChatVisible = true
        // this.messages.push({ user: this.user.username, text: 'this.text' })
      }
    },
    async wantChat () {
      const { data } = await getAPI()
      console.log(data)
      this.list = data.data
    },
    send () {
      if (!this.chatUser) {
        this.$message({ type: 'warning', message: '请选择聊天对象' })
        return
      }
      if (!this.text) {
        this.$message({ type: 'warning', message: '请输入内容' })
      } else {
        if (typeof WebSocket === 'undefined') {
          console.log('您的浏览器不支持WebSocket')
        } else {
          console.log('您的浏览器支持WebSocket')
          // 组装待发送的消息 json
          // {"from": "zhang", "to": "admin", "text": "聊天文本"}
          const message = {
            from: this.user.username,
            to: this.chatUser,
            text: this.text
          }
          socket.send(JSON.stringify(message)) // 将组装好的json发送给服务端，由服务端进行转发
          this.messages.push({ user: this.user.username, text: this.text })
          // 构建消息内容，本人消息
          this.createContent(null, this.user.username, this.text)
          this.text = ''
        }
      }
    },
    createContent (remoteUser, nowUser, text) {
      // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html
      // 当前用户消息
      if (nowUser) {
        // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        html =
          '<div class="el-row" style="padding: 5px 0">\n' +
          '  <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">\n' +
          '    <div class="tip left">' +
          text +
          '</div>\n' +
          '  </div>\n' +
          '  <div class="el-col el-col-2">\n' +
          '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
          '    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">\n' +
          '  </span>\n' +
          '  </div>\n' +
          '</div>'
      } else if (remoteUser) {
        // remoteUser表示远程用户聊天消息，蓝色的气泡
        html =
          '<div class="el-row" style="padding: 5px 0">\n' +
          '  <div class="el-col el-col-2" style="text-align: right">\n' +
          '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
          '    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">\n' +
          '  </span>\n' +
          '  </div>\n' +
          '  <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">\n' +
          '    <div class="tip right">' +
          text +
          '</div>\n' +
          '  </div>\n' +
          '</div>'
      }
      console.log(html)
      this.content += html
    }
  },
  mounted () {

  }
}
</script>

<style>
</style>
