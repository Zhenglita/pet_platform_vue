<template>
  <div>
     <div v-for="item in list" :key="item.uid" class="text item">
  <el-card class="box-card" style="margin-bottom:20px" v-if="item.username !==user.username">
  <div slot="header" class="clearfix">
    <el-avatar :size="50" :src="item.avatar"></el-avatar>
    <span>{{item.username}}</span>
    <div style="float: right; padding: 3px 0">
      <div>
       <el-button  type="text" @click="allArticle(item.uid)">他的作品</el-button>
      </div>
      <div>
         <el-button  type="text" @click="chat(item)">私聊</el-button>
      </div>

    </div>

  </div>
</el-card>
 </div>
      <el-dialog title="作品详情" :visible.sync="dialogVisible" width="60%">
        <div v-for="item in Articlelist" :key="item.aid" class="text item">
        <el-card class="box-card" style="height:120px">
               <div style="float: left;">
             <el-avatar :size="50" :src="item.image"></el-avatar>
    <span>{{item.title}}</span>
          </div>

    <div style="float: right;">
       <span>评论数量：{{item.comment||0}}</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="gotoArticle(item.aid)">查看详情</el-button>

    </div>

        </el-card>
        </div>
      </el-dialog>
        <el-dialog title="私聊" :visible.sync="dialogChatVisible" @close='cancel' width="60%">
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
import { getAllAPI, getUserAllAPI } from '@/api/FollowAPI'
import { delAPI, addAPI } from '@/api/MessageAPI'

import websocket from '@/views/user/websocket'
let socket
export default {
  name: 'Follow',
  data () {
    return {
      list: [],
      websocketUrl: '',
      Articlelist: [],
      chatUser: '',
      dialogVisible: false,
      dialogChatVisible: false,
      messages: [],
      text: '',
      content: '',
      user: {},
      UserList: []
    }
  },
  methods: {
    async cancel () {
      const { data } = await delAPI(this.chatUser)
      console.log(data)
      this.chatUser = ''
    },
    send () {
      if (!this.chatUser) {
        this.$message({ type: 'warning', message: '请选择聊天对象' })
        return
      }
      if (!this.text) {
        this.$message({ type: 'warning', message: '请输入内容' })
      } else {
        if (typeof (WebSocket) === 'undefined') {
          console.log('您的浏览器不支持WebSocket')
        } else {
          console.log('您的浏览器支持WebSocket')
          // 组装待发送的消息 json
          // {"from": "zhang", "to": "admin", "text": "聊天文本"}
          const message = { from: this.user.username, to: this.chatUser, text: this.text }
          socket.send(JSON.stringify(message)) // 将组装好的json发送给服务端，由服务端进行转发
          this.messages.push({ user: this.user.username, text: this.text })
          // 构建消息内容，本人消息
          this.createContent(null, this.user.username, this.text)
          this.text = ''
        }
      }
    },
    createContent (remoteUser, nowUser, text) { // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html
      // 当前用户消息
      if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        html = '<div class="el-row" style="padding: 5px 0">\n' +
            '  <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">\n' +
            '    <div class="tip left">' + text + '</div>\n' +
            '  </div>\n' +
            '  <div class="el-col el-col-2">\n' +
            '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
            '    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">\n' +
            '  </span>\n' +
            '  </div>\n' +
            '</div>'
      } else if (remoteUser) { // remoteUser表示远程用户聊天消息，蓝色的气泡
        html = '<div class="el-row" style="padding: 5px 0">\n' +
            '  <div class="el-col el-col-2" style="text-align: right">\n' +
            '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
            '    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">\n' +
            '  </span>\n' +
            '  </div>\n' +
            '  <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">\n' +
            '    <div class="tip right">' + text + '</div>\n' +
            '  </div>\n' +
            '</div>'
      }
      console.log(html)
      this.content += html
    },
    chat (item) {
      this.dialogChatVisible = true
      this.chatUser = item.username
      const username = this.user.username
      console.log()
      const _this = this
      if (typeof (WebSocket) === 'undefined') {
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
          addAPI(item.username)
        }
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        socket.onmessage = function (msg) {
          console.log('收到数据====' + msg.data)
          const data = JSON.parse(msg.data) // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
          if (data.users) { // 获取在线人员信息
            _this.users = data.users.filter(user => user.username !== username) // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
          } else {
            // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
            //  // {"from": "zhang", "text": "hello"}
            if (data.from === _this.chatUser) {
              _this.messages.push(data)
              // 构建消息内容
              _this.createContent(data.from, null, data.text)
            } else {
              _this.$message({ type: 'warning', message: '对方还未接受邀请' })
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
        // const message = { from: this.user.username, to: this.chatUser, text: 'this.text' }
        // socket.send(JSON.stringify(message)) // 将组装好的json发送给服务端，由服务端进行转发
      }
    },
    gotoArticle (value) {
      this.$router.push(
        {
          name: 'details',
          query: {
            id: value
          }
        }
      )
    },
    async allArticle (uid) {
      const { data } = await getUserAllAPI(uid)
      console.log(data)
      this.Articlelist = data.data
      this.dialogVisible = true
    },
    async getAll () {
      const { data } = await getAllAPI()
      console.log(data)
      this.list = data.data
    }
  },
  created () {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    console.log(websocket)
    this.websocketUrl = websocket
    this.getAll()
  },
  mounted () {

  }
}
</script>

<style>

</style>
