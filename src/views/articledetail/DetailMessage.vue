<template>
  <div>
    <el-card class="box-card" >
      <div style="display: flex">
        <el-input v-model="title" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search"
          >搜索</el-button
        >
      </div>
    </el-card>
    <el-card class="box-card">
      <p>公告</p>
       <hr/>
      <p>111</p>
      <p>111</p>
      <p>111</p>
      <p>111</p>
      <p>111</p>
    </el-card>
    <el-card class="box-card">
      <p>最新评论</p>
      <hr/>
      <div>
        <div v-for="o in CommentList" :key="o.id" class="text item" style="display: flex;">
          <div style="flex:1">{{o.content }}</div><div style="float: right;">{{ o.username }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTheArticleNewCommentAPI } from '@/api/CommentAPI'
import bus from '@/components/home/EventBus'
export default {
  name: 'DetailMessage',
  data () {
    return {
      title: '',
      id: 1,
      CommentList: []
    }
  },
  methods: {
    async getNewComment () {
      const { data } = await getTheArticleNewCommentAPI(this.id)
      console.log(data)
      this.CommentList = data.data
    },
    search () {
      this.$router.push('/home')
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getNewComment()
  },

  beforeDestroy () {
    bus.$emit('return', this.title)
  }

}
</script>

<style lang="less" scoped>
.box-card{
  margin-right: 120px,
}
</style>
