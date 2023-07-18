<template>
  <div class="book-container" >

    <el-row style="width: 100%;margin-bottom: 60px;font-family: 'youlang';">
      <el-col :span="24">
        <el-card style="width: 100%;" :body-style="{ padding: '10px' }">
          <div class="all">
            <div class="left">
              <!-- 图片 -->
              <!-- <img :src="image" /> -->
              <el-image style="width: 200px; height: 200px" :src="image" fit="fill"></el-image>
            </div>

            <div style="padding: 20px" class="right">
              <div class="bottom clearfix">
                <h1>{{ bookname }} </h1>
                价格：<span style="color:red">￥{{ price }}</span>
              </div>
              <div>
                <span>作者：{{ author }} 库存：{{ quantity }}</span>
              </div>
              <div>
                <span>出版社：{{ press }}</span>
              </div>
              <div>
                <span>类型：{{ type }}</span>

              </div>
              <div class="grid-content bg-purple-light"><el-button type="text" class="button" @click="toBookDetail(bid)">了解详情</el-button></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'BookInfo',
  data () {
    return {
    }
  },
  props: {
    bid: {
      type: [String, Number],
      require: true
    },
    author: {
      type: String,
      default: ''
    },
    bookname: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    press: {
      // 可以传两种值
      type: [String, Number],
      default: ''
    },
    authorcontent: {
      type: String,
      default: ''
    },
    bookcontent: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    enable: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      default: 0
    },
    username: {
      type: String,
      default: ''
    }
  },
  methods: {
    toBookDetail (bid) {
      this.$router.push('/home/books/bookdetail/' + bid)
    }

  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.book-container {
  margin-left: 100px;
  width: 90%;
}
.all {
  display: flex;
  width: 100%;
}
</style>
