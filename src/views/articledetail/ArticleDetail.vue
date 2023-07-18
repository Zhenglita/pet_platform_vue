<template>
  <div>
    <el-card class="box-card" v-if="dialog1 === false">
      <el-empty description="暂无权限"></el-empty>
    </el-card>
    <el-card class="box-card" v-if="dialog1 === true">
      <div class="text item" style="width: 100%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <!-- <el-breadcrumb-item><a href="/">文章列表</a></el-breadcrumb-item> -->
          <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
        <hr />
        <el-card style="padding-left: 20px;padding-right: 30px;">
          <div>
            <h1>标题：{{ list.title }}</h1>
            <div style="float: right; margin-top: -50px">
              <div style="display: flex; margin-bottom: 16px">
                <el-avatar :src="list.uimage" :size="60" style="margin-right: 20px"></el-avatar>
                <h2>{{ list.author }}</h2>
              </div>
              <div>
                <el-button type="warning" style="margin-left: 20px;" plain @click="follow()">{{
                  text
                }}</el-button>
              </div>
            </div>
          </div>
          <div style="margin-top: 60px">
            <h1>时间：{{ list.date }}</h1>
          </div>
        </el-card>
        <el-card class="box-card">
          <el-image v-if="list.image" style="width: 1280px; height: 800px" :src="list.image" :lazy="true" :fit="fill"></el-image>
        </el-card>
        <el-card style="padding-left: 30px;padding-right: 30px;">
          <h3>内容：{{ list.message }}</h3>
        </el-card>
        <el-card style="margin-top: 20px;padding-left: 30px;padding-right: 30px;">
          <h1>管理员{{list.enable_user.username}}的审核推荐</h1>
          <div style="margin-bottom: 20px;">
            <div style="display: flex;">
            <div style="display: flex;">
            <el-avatar :src="list.enable_user.avatar" v-if="list.enable_user.avatar" :size="60" style="margin-right: 20px"></el-avatar>
            <h1>{{ list.enable_user.username }}</h1>
            </div>

            <div style="margin-left: 500px;margin-top: -28px;">
              <h1 style="margin-left: 25px;">推荐等级</h1>
              <el-rate v-model="list.enable_rate" show-text  disabled
            >
              </el-rate>
            </div>

            </div>
          </div>
          <h1>管理员评论内容：</h1>
          <p>{{ list.enable_message||adminmessage}}</p>
        </el-card>
        <el-card>
          <div style="margin-top: 10px; margin-bottom: 80px">
            <div>
              <h1 style="padding-left: 40px;">畅享言论</h1>
              <div style="margin-top: 20px;padding: 100px;padding-top: 20px;padding-bottom: 10px; color: #888">
                <div>
                  <el-input type="textarea" :rows="3" v-model="entity.content"></el-input>
                  <div style="text-align: right; padding: 10px">
                    <el-button type="primary" @click="save">留言</el-button>
                  </div>
                </div>
              </div>
              <h1 style="padding-left: 40px;">用户言论</h1>
              <div style="display: flex;margin-top: 20px;padding: 100px;padding-top: 20px;padding-bottom: 10px;" v-for="item in messages" :key="item.id">
                <div style="padding: 0 10px; flex: 5">
                  <div style="display: flex;">
                    <el-avatar :src="item.avatar" :size="50" ></el-avatar>
                    <h1 style="font-size: 24px;margin-top: 20px;margin-left: 30px;flex: 1;">{{ item.username }}</h1>
                    <div style="flex:9;">
                      <el-button type="text" style="float:right;"  @click="del(item.id)" v-if="item.username === user.username">删除</el-button>
                    </div>
                  </div>
                  <div style="padding: 10px 0; color: #888">
                    {{ item.content }}
                  </div>
                  <div style="padding: 10px 0; color: #888">
                    {{ item.createtime }}
                    <el-button type="text" style="margin-left: 20px" @click="reReply(item.id)">回复</el-button>
                    <!-- <el-button type="text" size="mini" @click="del(item.id)" v-if="item.username === user.username">删除</el-button> -->
                  </div>
                  <div style="background-color: #eee; padding: 10px;" v-for="items in item.children" :key="items.id">
                    <div style="display: flex;">
                      <el-avatar :src="item.avatar" :size="50"></el-avatar>
                    <p style="margin-left: 20px;">{{ items.username }}：{{ items.content }}</p>
                    <div style="flex:9;">
                      <el-button type="text" style="float: right;" @click="del(items.id)" v-if="items.username === user.username">删除</el-button>
                      </div>
                    </div>

                    <div>
                      <p >{{ items.createtime }}</p>
                    </div>
                  </div>
                  <!-- <div style="color: #888; font-size: 12px;">
                    <el-button type="text" style="margin-left: 20px" @click="reReply(item.id)">回复</el-button>
                  </div> -->
                </div>
              </div>

              <el-dialog title="回复信息" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="entity" label-width="80px">
                  <el-form-item label="内容">
                    <el-input v-model="entity.reply" autocomplete="off" type="textarea" :rows="3"></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <el-button @click="cancel">取 消</el-button>
                  <el-button type="primary" @click="reply">确 定</el-button>
                </template>
              </el-dialog>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleALLListAPI } from '@/api/articleAPI'
import { addAPI } from '@/api/FollowAPI'
import { getAllMessagesAPI, deleteMessagesAPI } from '@/api/CommentAPI'
import request from '@/utils/request'
export default {
  name: 'ArticleDetail',
  methods: {
    async follow () {
      const { data } = await addAPI(this.list.uid)
      console.log(data)
      if (data.flag === true) {
        this.text = data.things
      } else {
        this.text = data.things
      }
    },
    async getAll () {
      console.log(this.id)
      const { data } = await getArticleALLListAPI(this.id)
      this.list = data.data
      this.text = data.things
      console.log(this.list)
    },
    async loadMessage () {
      const { data } = await getAllMessagesAPI(parseInt(this.id))
      this.messages = data.data
      console.log(this.messages)
    },
    cancel () {
      this.dialogFormVisible = false
      this.entity = {}
    },
    reReply (id) {
      this.dialogFormVisible = true
      this.entity.pid = id
    },
    reply () {
      this.entity.content = this.entity.reply
      this.save()
    },

    async save () {
      if (!this.user.username) {
        this.$message({
          message: '请登录',
          type: 'warning'
        })
        return
      }
      if (!this.entity.content) {
        this.$message({
          message: '请填写内容',
          type: 'warning'
        })
        return
      }
      // 如果是评论的话，在 save的时候要注意设置 当前模块的id为 foreignId。也就是  entity.foreignId = 模块id
      this.entity.username = this.user.username
      this.entity.user_id = this.user.uid
      this.entity.foregin_id = parseInt(this.id)
      const res = await request.post('/comments', this.entity)
      console.log(res)
      if (res.data.flag) {
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        this.entity = {}
        this.loadMessage()
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }

      this.dialogFormVisible = false
    },
    async del (id) {
      const res = await deleteMessagesAPI(id)
      if (res.data) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }

      this.loadMessage()
    }
  },
  data () {
    return {
      id: 1,
      dialog1: true,
      list: {
        enable_rate: 0,
        enable_user: {
          username: ''
        }
      },
      adminmessage: '暂无评论',
      fill: 'fill',
      text: '关注',
      user: {},
      messages: [],
      dialogFormVisible: false,
      isCollapse: false,
      entity: {}
    }
  },

  created () {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : {}
    if (this.user.role === 'ROLE_ADMIN') {
      this.dialog1 = true
    } else if (this.user.role === 'ROLE_BLOGGER') {
      this.dialog1 = true
    } else if (this.user.role === 'ROLE_READER') {
      this.dialog1 = true
    } else {
      this.$message({ type: 'warning', message: '请先登录！！' })
      this.dialog1 = false
    }
    this.id = this.$route.query.id
    this.getAll()
    this.loadMessage()
    // console.log(this.user)
  }
}
</script>

<style lang="less" scoped>
/deep/.el-breadcrumb__inner {
    font-size: x-large;
}
</style>
