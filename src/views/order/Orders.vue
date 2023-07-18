<template>
  <div>
      <el-card>
        <div>
          <div style="float:left;">
            <el-input placeholder="请输入订单名字" v-model="input" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>

          <el-button type="primary"  @click="get">查询</el-button>
          <el-button type="info"  @click="reset">重置</el-button>
        </div>

        <div style="margin-top:20px">
          <el-button type="danger"  @click="Delete">批量删除</el-button>
        </div>

      </el-card>
      <div>
        <el-table :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" border style="width: 100%" tooltip-effect="dark">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="name" label="订单名字" width="130">
          </el-table-column>
          <el-table-column prop="no" label="编号" width="260">
          </el-table-column>
          <el-table-column prop="total_price" label="总金额（元）" width="120">
          </el-table-column>
          <el-table-column prop="state" label="物流状态" width="120">
          </el-table-column>
          <el-table-column prop="place" label="收货地址" >
          </el-table-column>
          <el-table-column prop="time" label="下单时间" width="220">
          </el-table-column>
          <el-table-column prop="pay_time" label="付款时间" width="220">
          </el-table-column>
          <el-table-column prop="price" label="查看商品" width="160">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="handleGet(scope.row)">查看商品</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
              <el-button type="danger" size="mini" v-if="scope.row.pay_state===false" @click="toBuyAgain(scope.row)">重新支付</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <el-dialog title="商品详情" :visible.sync="dialogVisible" width="60%">
        <el-card class="box-card">
          <el-table :data="detailData" ref="multipleTable" border style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="image" label="图书图片" width="180">
              <template v-slot="scope">
                <img :src="scope.row.image" alt="" width="90" height="90">
              </template>
            </el-table-column>
            <el-table-column prop="bookname" label="图书名字" width="190">
            </el-table-column>
            <!-- <el-table-column prop="bookcontent" label="图书详情" width="190">
            </el-table-column> -->
            <el-table-column width label="图书详情" align="center" prop="bookcontent">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" :content="row.bookcontent" placement="top">
              <div
                style="width:100%;padding: 0px;display: -webkit-box;-webkit-line-clamp:3;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;white-space: normal;line-height:18px;"
              >{{row.bookcontent}}</div>
            </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="购买数量（本）" width="150">
            </el-table-column>
            <el-table-column prop="price" label="价格（元）" width="128">
            </el-table-column>

          </el-table>
        </el-card>
      </el-dialog>
    </div>

</template>

<script>
import { getAllOrdersAPI, delOrdersAPI, getOrdersNameAPI } from '@/api/OrderAPI'
import request from '@/utils/request'
export default {
  name: 'Orders',
  data () {
    return {
      // 用来存储从接口得到的数据
      tableData: [],
      detailData: [],
      multipleSelection: [],
      message: 0,
      dialogVisible: false,
      user: {},
      input: ''
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    async handleDelete (val) {
      const { data } = await delOrdersAPI(val.id)
      console.log(data)
      this.getAll()
    },
    async getAll () {
      const { data } = await getAllOrdersAPI(this.user.uid)
      this.tableData = data.data
    },
    async get () {
      if (this.input === '') {
        this.getAll()
      } else {
        const { data } = await getOrdersNameAPI(this.input, this.user.uid)
        this.tableData = data.data
      }
    },
    async reset () {
      this.input = ''
    },
    async Delete () {
      const Data = { orders: this.multipleSelection }
      const { data } = await request.post('/orders/del', Data)
      console.log(data)
      this.getAll()
    },
    async handleGet (val) {
      console.log(val)
      this.dialogVisible = true
      const Data = { orderBooks: val.orderBooks }
      const { data } = await request.post('/orderbooks', Data)
      this.detailData = data.data
      console.log(data)
    },
    async toBuyAgain (row) {
      const str = 'http://124.221.174.183:8083/alipay/pays?subject=' + row.name + '&traceNo=' + row.no + '&totalAmount=' + row.total_price
      window.open(str)
    }
  },
  created () {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : {}
    this.getAll()
  }
}
</script>

<style lang="less" scoped>
</style>
