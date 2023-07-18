<template>
  <div>
<Header title="购物车"></Header>
        <Goods v-for="item in list"
        :key="item.oid"
        :title="item.oname"
        :price="item.price"
        :image="item.oimage"
        :state="item.status"
        :count="item.ocount"
        @upstate="upstate"
        :id="item.oid">
        <Counter
        :getcount="item.ocount"
        :getid="item.oid"
        @addcount="getNewNum(item,$event)"
        @decreasecount="getNewNum(item,$event)"
        ></Counter>

        </Goods>

        <Footer
        :sum="sumprice"
        :getfullstate="fullState"
        :choosecount="total"
        @getsumprice="topay"
        @fullchange="changestate"></Footer>
        <!-- <button @click="initCartList">555</button> -->
  </div>
</template>

<script>
// import { formatDate } from '@/utils/date'
import Header from '@/components/shop/Header/header.vue'
import Goods from '@/components/shop/Goods/goods.vue'
import Footer from '@/components/shop/Footer/footer.vue'
import Counter from '@/components/shop/Counter/counter.vue'

import { getAllOrdersAPI } from '@/api/OrderAPI'
import request from '@/utils/request'
export default {
  name: 'Orders',
  data () {
    return {
      // 用来存储从接口得到的数据
      list: [],
      orderlist: [],
      message: false,
      user: {},
      timeindex: 0,
      oidlist: [],
      params: ''
    }
  },
  components: {
    Header: Header,
    Goods: Goods,
    Footer: Footer,
    Counter
  },

  methods: {
    // 封装请求列表数据
    async initCartList () {
      const { data } = await getAllOrdersAPI(this.user.uid)
      this.orderlist = data.data
      if (data.flag === true & this.list != null) {
        this.orderlist = data.data
        this.orderlist.filter(item => item.isok === false).forEach((items) => {
          this.list.push(items)
        })
      }
      console.log(this.list)
      // this.orderlist = []
      // this.list = []
    },
    upstate (val) {
      const date = new Date()
      // console.log(val)
      // 用some来查找需要替换的那个数据
      // eslint-disable-next-line array-callback-return
      this.list.some((item, index) => {
        if (item.oid === val.id) {
          this.timeindex = index
          item.status = val.newstate
          item.isok = item.status
          item.time = date
          return true
        }
      })
      // if (this.list[this.timeindex].status === true) {
      //   this.list[this.timeindex].time = date
      //   console.log(this.list[this.timeindex].time)
      // }
    },
    changestate (val) {
      const date = new Date()
      this.list.forEach((item, index) => {
        item.status = val
        item.isok = item.status
        item.time = date
      })

      console.log(this.list)
    },
    getNewNum (item, e) {
      item.ocount = e
    },
    async topay () {
      // this.date = new Date().toLocaleString()
      // this.list.time = this.date
      console.log(JSON.stringify(this.list))
      const res = await request.put('/orders', this.list)
      console.log(res)
      this.message = res.data.flag
      this.list = []
      this.initCartList()
    }

  },
  created () {
    // 调用axios方法获取数据，created数据完成
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    this.initCartList()
  },
  // 计算属性
  computed: {
    // 全选
    // eslint-disable-next-line vue/return-in-computed-property
    fullState () {
      return this.list.every(item => item.status)
    },
    sumprice () {
      return this.list.filter(item => item.status).reduce((amt, item) => {
        // eslint-disable-next-line no-return-assign
        return amt += item.ocount * item.price
      }, 0)
    },
    total () {
      return this.list.filter(item => item.status).reduce((amt, item) => {
        // eslint-disable-next-line no-return-assign
        return amt += item.ocount
      }, 0)
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>

</style>
