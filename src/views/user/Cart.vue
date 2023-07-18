<template>
  <div>
    <div>
      <el-table :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" border style="width: 100%" tooltip-effect="dark">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="image" label="图书图片" width="180">
          <template v-slot="scope">
            <img :src="scope.row.image" alt="" width="90" height="90">
          </template>
        </el-table-column>
        <el-table-column prop="bookname" label="图书名字" width="190">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="260">
           <template v-slot="scope">
           <el-input-number v-model="scope.row.num" @change="handleChange(scope.row)" :min="1" :max="scope.row.quantity" label="描述文字"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格（元）" width="120">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="float:right">
      <h1>当前已选商品总价：￥{{sumprice}}（元）</h1>
      <el-button type="success" @click="topay">付款</el-button>

    </div>

  </div>
</template>

<script>
import { getByuidCartAPI, updateCartAPI, deleteCartAPI } from '@/api/CartAPI'
import request from '@/utils/request'

export default {
  name: 'Cart',
  // components: { Pay },
  data () {
    return {
      dialogVisible: false,
      user: {},
      aliform: '',
      no: 2,
      book: {},
      total: 20,
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    async getAll () {
      const { data } = await getByuidCartAPI(this.user.uid)
      this.tableData = data.data
      console.log(data)
    },
    handleChange (value) {
      console.log(value)
      this.book.num = value.num
      this.book.books_id = value.books_id
    },
    async topay () {
      if (!this.multipleSelection.length) {
        this.$message.error('选择需要结算的商品')
        return
      }
      if (this.user.place === '') {
        this.$message.error('收货地址为空')
        return
      }
      updateCartAPI(this.book.books_id, this.user.uid, this.book.num)
      // 需要大改，不能支付没成功就直接生成订单
      const Data = { name: this.multipleSelection[0].bookname, total_price: this.sumprice, user_id: this.user.uid, carts: this.multipleSelection }
      request.post('/orders', Data).then(res => {
        // window.open("http://www.baidu.com/", "_blank");
        const str = 'http://124.221.174.183:8083/alipay/pays?subject=' + res.data.data.name + '&traceNo=' + res.data.data.no + '&totalAmount=' + res.data.data.total_price
        window.open(str)
        this.getAll()
      })
      // this.dialogVisible = true
    },
    async handleDelete (value) {
      console.log(value)
      const { data } = await deleteCartAPI(value.user_id, value.books_id)
      console.log(data)
      this.getAll()
    }
  },
  created () {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : {}

    this.getAll()
  },
  mounted () {

  },

  beforeDestroy () {
    if (JSON.stringify(this.book) !== '{}') {
      updateCartAPI(this.book.books_id, this.user.uid, this.book.num)
    }
  },
  computed: {
    sumprice () {
      return this.multipleSelection.reduce((amt, item) => {
        // eslint-disable-next-line no-return-assign
        return amt += item.num * item.price
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
