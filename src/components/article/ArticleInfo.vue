<template>
  <div class="articleinfo-container" style="margin-left:0px;font-family: 'youlang';">
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '10px' }">
          <div class="all">
            <div class="left">
              <!-- 图片 -->
              <el-image
      style="width: 100%; height: 200px;margin-top:0px;margin-bottom:0px"
      :src="image"
      fit="fill"
     ></el-image>
              <!-- <img :src="image"  /> -->
            </div>
            <div style="padding: 20px;padding-bottom: 0px;" class="right">
              <div style="display: flex;">
                 <h1>{{ title }}</h1>
              <el-button type="text" size="mini" @click="del(id)" v-if="author === username">删除</el-button>
              </div>

              <div class="text-content" >
                <p class="text">{{ message }}</p>
              </div>
            </div>
          </div>
          <hr />
          <el-row>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <div class="bottom clearfix">
                  <time class="time">时间：{{ pubdate }}</time>
                </div>
              </div></el-col
            >
             <el-col :span="8"
              ><div class="grid-content bg-purple"><div class="bottom clearfix">作者：{{author}}</div></div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple-light" style="margin-top:7px"> <el-badge :value="comm_count" class="item">
                <el-button size="mini">评论</el-button>
              </el-badge></div></el-col
            >

            <el-col :span="6"

              ><div class="grid-content bg-purple-light"><div class="bottom clearfix"><el-button type="text" class="button" @click="toArticleDetail(id,username)">阅读全文</el-button></div></div></el-col
            >
          </el-row>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  name: 'ArticleInfo',
  props: {
    id: {
      type: [String, Number],
      require: true
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    author: {
      // 可以传两种值
      type: [String, Number],
      default: ''
    },
    comm_count: {
      type: Number,
      default: 0
    },
    pubdate: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    username: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    del (val) {
      this.$emit('change', val)
    },
    toArticleDetail (id, u) {
      console.log(u)
      if (u === 1) {
        this.$message({ type: 'warning', message: '请先登录！！' })
      } else {
        console.log(this.id)
        // this.$router.push('/home/ArticleDetail/detail/' + id)
        this.$router.push(
          {
            name: 'details',
            query: {
              id
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.three {
  display: flex;
}
.articleinfo-container {
  border-radius: 4px;
}
.articleinfo-container img {
  width: 100px;
  height: 80px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.el-row {
  // border: 1px solid #000000;
}
.all {
  display: flex;

}
.right {
  flex: 3;
}
.left {
  flex: 1;
}
.footer {
  display: flex;
}
.talk {
  float: right;
}
.el-row{
  margin-bottom: 20px;
}

.text{
display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 5;
 overflow: hidden;
  text-align:justify;
text-justify:inter-ideograph;
}
</style>
