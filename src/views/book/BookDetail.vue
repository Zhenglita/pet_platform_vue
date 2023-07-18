<template>
  <div class="book-container">

    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '10px' }">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/books/home' }">图书首页</el-breadcrumb-item>

            <el-breadcrumb-item>图书详情</el-breadcrumb-item>

          </el-breadcrumb>
          <hr />
          <div class="all">
            <div class="left">
              <!-- 图片 -->
              <el-image style="width: 400px; height: 400px" :src="list.image" v-if="list.image" fit="fill"></el-image>
              <!-- <img :src="list.image" /> -->
            </div>

            <div style="padding: 20px" class="right">
              <div class="bottom clearfix">
                <h2>{{ list.bookname }} </h2>
                <h3>售价：￥{{ list.price }}(元)</h3>
              </div>
              <div>
                <h3>作者：{{ list.author }} 库存：{{ list.quantity }}(本)</h3>
              </div>
              <div>
                <h3>类型：{{ list.type }}</h3>
              </div>
              <div>
               <h3>出版社：{{ list.press }}</h3>
                <div>
                  <el-button type="primary" v-if="this.flag" @click="getadd()">加入购物车</el-button>
                  <div v-else>
                    <el-input-number v-model="count" @change="handleChange(count)" :min="1" :max="list.quantity+this.count" label="描述文字"></el-input-number>
                    <!-- <button @click="decrease">-1</button>
                    <input type="text" :value="this.count">
                    <button @click="add">+1</button> -->
                  </div>
                </div>
              </div>

            </div>

          </div>
           <div>
            <h1>代金券</h1>
          <el-row>
  <el-col :span="11" v-for="o in voucherList" :key="o.id" :offset="o.id > 0 ? 1 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
      <div style="padding: 14px;">
        <div style="display: flex;">
          <b>{{o.actual_value}}元代金券</b>
           <el-tag type="danger" size="mini" style="margin-left:10px">{{o.title}}</el-tag>
        </div>
        <div style="display: flex;">
           <div style="margin-top:20px">{{o.rules}}</div>
           <div style="margin-left:auto;"><el-button size="mini" @click="tobuy(o)">限时抢购</el-button>
                 <div style="margin-left:10px;margin-top:8px"><span style="font-size:14px" v-if="o.type===true">剩余{{o.stock}}张</span></div></div>
        </div>
        <div style="display: flex;margin-top:8px" >
          <div>售价：￥{{ o.pay_value }}(元)</div>
          <el-tag type="danger" size="mini" style="margin-left:10px">8折</el-tag>
          <div style="margin-left:auto;"><time class="time" style="font-size:14px" v-if="o.type===false">有效期：{{o.time}}全年</time>
          <time class="time" style="font-size:14px" v-else>秒杀时间：{{o.begin}}~~~~{{o.end}}</time></div>
        </div>
      </div>
    </el-card>
  </el-col>
          </el-row>
          </div>
          <div>
            <h1>内容简介</h1>
            <p>{{list.bookcontent}}</p>
          </div>
          <div>
            <h1>作者简介</h1>
            <p>{{list.authorcontent}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getBooksByBIdAPI } from '@/api/BooksAPI'
import bus from '@/components/book/EventBus'
import { getCartAPI, updateCartAPI } from '@/api/CartAPI'
import { addVoucherAPI } from '@/api/OrderAPI'
import request from '@/utils/request'
export default {
  name: 'BookDetail',
  props: {
    bid: {
      default: 1,
      type: [Number, String]
    }
  },
  data () {
    return {
      flag: true,
      type: '',
      count: 0,
      sumquantity: 0,
      list: [],
      voucherList: [],
      user: {},
      book: {},
      message: '',
      formData: {}
    }
  },
  methods: {
    // async getById () {
    //   const { data } = await getBooksByBIdAPI(this.bid, this.user.uid)
    //   this.list = data.data
    //   this.getCartbyUserId()
    //   console.log(this.list)
    // },
    async getCartbyUserId () {
      const { data } = await getCartAPI(this.bid, this.user.uid)
      this.list = data.data
      this.voucherList = data.things
      this.sumquantity = data.data.quantity
      this.flag = data.flag
      this.count = data.num
      console.log(data.data)
    },
    handleChange (value) {
      console.log(value, this.sumquantity)
      this.list.quantity = this.sumquantity - value
    },
    async getadd () {
      if (this.list.quantity !== 0) {
        this.formData.user_id = this.user.uid
        this.formData.books_id = this.list.id
        this.formData.num = 1
        console.log(this.formData)
        const { data } = await request.post('/carts', this.formData)
        console.log(data)
        this.getCartbyUserId()
      } else {
        this.$message.error('库存不足')
      }
    },
    async tobuy (o) {
      console.log(o)
      const { data } = await addVoucherAPI(o.id)
      console.log(data)
      if (data.flag === false) {
        this.$message.error(data.msg)
      } else {
        const str = 'http://124.221.174.183:8083/alipay/pays?subject=' + data.data.name + '&traceNo=' + data.data.no + '&totalAmount=' + data.data.total_price
        window.open(str)
        this.$message.success('购买成功')
      }

      this.getCartbyUserId()
    }
  },
  created () {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : {}
    this.getCartbyUserId()
  },
  mounted () {
    bus.$on('post', (val, message) => {
      this.type = val
      this.message = message
    })
    // bus.$on('postmessage', val => {
    //   this.message = val
    // })
  },
  beforeDestroy () {
    updateCartAPI(this.bid, this.user.uid, this.count)
    bus.$emit('end', this.type, this.message)
    bus.$off('post')
    bus.$off('postmessage')
  }
}
</script>

<style lang="less" scoped>
.book-container {
  // margin-left: 100px;
  width: 70%;
  font-family: 'youlang';
}
.left {
  width: 50%;
}
.right {
  width: 50%;
}
.all {
  display: flex;
}
 .image {
    width: 100%;
    // display: block;
  }
</style>
