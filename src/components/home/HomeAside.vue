<template>
  <div>
    <el-card class="box-card" style="float: right;margin-right:60px">
      <div style="display:flex">
        <el-input v-model="title" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>

    </el-card>

    <el-card class="box-card" style="float: right;margin-right:60px;height: 1520px;margin-top: 20px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="最新文章" name="first">
          <div v-for="o in articleslist" :key="o.aid" style="margin-top:18px">
            <div class="item" style="margin-bottom: 18px;">
            <div class="left">
              <el-image
              v-if="o.image"
      style="width: 100px; height: 100px"
      :src="o.image"
      fit="fill"></el-image>
               <!-- <el-avatar shape="square" :size="100" fit="contain" :src="o.image"></el-avatar> -->
            </div>
            <div class="right">
              <div style="height:50px"> <p class="text">{{ o.title}}</p></div>
              <div style="margin-top: 30px;">
          <p class="text-type" style="color: aqua;margin-bottom: 0px;">{{ o.type }}</p>
            </div>
            </div>

            </div>
            <hr style="background-color:#808080; dotted"/>
          </div>

        </el-tab-pane>
        <el-tab-pane label="热门文章" name="second">
          <div v-for="o in hotlist" :key="o.foregin_id" class="text_item" style="margin-top:18px">
            <!-- <p class="text">{{ o.articlename }}</p> -->
            <div class="item" style="margin-bottom: 18px;">
            <div class="left">
              <el-image
              v-if="o.articleUrl"
      style="width: 100px; height: 100px"
      :src="o.articleUrl"
      fit="fill"></el-image>
               <!-- <el-avatar shape="square" :size="100" fit="fill" :src="o.articleUrl"></el-avatar> -->
            </div>
            <div class="right">
              <div style="height:50px">
                <p class="text">{{ o.articlename}}</p>
              </div>
                      <div style="margin-top: 30px;">
                        <p class="text-type" style="color: aqua;margin-bottom: 0px;">热度：{{ o.count ||0}}</p>
                      </div>
                     </div>

            </div>
            <hr style="background-color:#808080; dotted"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="随机文章" name="third">
          <div v-for="o in randomlist" :key="o.foregin_id" class="text_item" style="margin-top:18px">

            <div class="item" style="margin-bottom: 18px;">
            <div class="left">
              <el-image
              v-if="o.image"
      style="width: 100px; height: 100px"
      :src="o.image"
      fit="fill"></el-image>
               <!-- <el-avatar shape="square" :size="100" fit="contain" :src="o.image"></el-avatar> -->
            </div>
            <div class="right">
              <div style="height:50px"> <p class="text">{{ o.title}}</p></div>
              <div style="margin-top: 30px;">
          <p class="text-type" style="color: aqua;margin-bottom: 0px;">{{ o.type }}</p>
            </div>
            </div>

            </div>
            <hr style="background-color:#808080; dotted"/>

            <!-- <p class="text">{{ o.title }}</p> -->

          </div>
        </el-tab-pane>
        <el-tab-pane label="推荐" name="fourth">
          <div v-for="o in mendlist" :key="o.foregin_id" class="text_item" style="margin-top:18px">
            <div class="item" style="margin-bottom: 18px;">
            <div class="left">
              <el-image
              v-if="o.image"
      style="width: 100px; height: 100px"
      :src="o.image"
      fit="fill"></el-image>
               <!-- <el-avatar shape="square" :size="100" fit="contain" :src="o.image"></el-avatar> -->
            </div>
            <div class="right">
              <div style="height:50px"> <p class="text">{{ o.title}}</p></div>
              <div style="margin-top: 30px;">
          <p class="text-type" style="color: aqua;margin-bottom: 0px;">{{ o.type }}</p>
            </div>
            </div>

            </div>
            <hr style="background-color:#808080; dotted"/>
            <!-- <p class="text"> {{ o.title }}</p> -->

          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- <el-card class="box-card" style="float: right;margin-right:60px;margin-top:20px">
      <div>
        <h1>管理员公告</h1>
        <div v-for="o in 10" :key="o" class="text_item">
          {{ '列表内容 ' + o }}
        </div>
      </div>

    </el-card> -->
    <el-card class="box-card" style="float: right;margin-right:60px;margin-top:20px">
      <h1>最新评论</h1>
      <div>
        <div v-for="o in newcommentlist" :key="o.id" class="text_item">
          <p class="text">{{o.content }}</p>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import bus from '@/components/home/EventBus'
import { getTenNewArticleAPI, getHotArticleAPI, getRandomArticleAPI, getMendArticleAPI } from '@/api/articleAPI'
import { getTenNewCommentAPI } from '@/api/CommentAPI'
export default {
  name: 'HomeAside',
  data () {
    return {
      activeName: 'second',
      input: '',
      title: '',
      flag: false,
      articleslist: [],
      hotlist: [],
      randomlist: [],
      mendlist: [],
      newcommentlist: []
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async getnewArticle () {
      const { data } = await getTenNewArticleAPI()
      console.log(data)
      this.articleslist = data.data
    },
    async gethotArticle () {
      const { data } = await getHotArticleAPI()
      console.log(data)
      this.hotlist = data.data
    },
    async getRandomArticle () {
      const { data } = await getRandomArticleAPI()
      this.randomlist = data.data
    },
    async getMendArticle () {
      const { data } = await getMendArticleAPI()
      this.mendlist = data.data
    },
    async getNewComment () {
      const { data } = await getTenNewCommentAPI()
      this.newcommentlist = data.data
    },
    search () {
      bus.$emit('share', this.title)
    }
  },
  created () {
    this.getnewArticle()
    this.gethotArticle()
    this.getRandomArticle()
    this.getMendArticle()
    this.getNewComment()
  }
}
</script>

<style lang="less" scoped>
.item{
  display: flex;
}
.box-card {
  width: 70%;
}
.el-tabs {
  float: left;
}
.text{
display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 2;
 overflow: hidden;
 text-align:justify;
text-justify:inter-ideograph;
margin-left: 15px;
margin-top: 0px;
font-family: 'tengxiang';

}
.text-type{
  display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 2;
 overflow: hidden;
 text-align:justify;
  text-justify:inter-ideograph;
  margin-left: 15px;
  font-family: 'tengxiang';
}
/deep/.el-tabs{
.el-tabs__item{
font-size:16px;
}
}
</style>
