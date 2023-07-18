<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="待发货" name="first">
        <div v-for="item in list" :key="item.id">
          <el-card class="box-card" size="mini">
            <div style="float:right;">
              <el-tag type="warning">{{item.state}}</el-tag>
            </div>
            <div>
              <el-descriptions title="订单信息" :column="3" border>
                <el-descriptions-item label="订单号" >{{item.no}}</el-descriptions-item>
                <el-descriptions-item label="用户" :contentStyle='contentStyle' :labelStyle='labelStyle'>{{item.users.username}}</el-descriptions-item>
                <el-descriptions-item label="购买信息">
                  <el-button type="text" @click="more(item)">详情</el-button>
                </el-descriptions-item>
                <el-descriptions-item label="收货地址">{{item.place}}</el-descriptions-item>
                 <el-descriptions-item label="操作" :contentStyle=buttonContentStyle>
                  <el-button type="primary" @click="send(item)">发货</el-button>
                  <el-button type="danger" @click="delupdata(item)">取消订单</el-button>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已发货" name="second">
        <div v-for="item in list" :key="item.id">
          <el-card class="box-card" size="mini">
            <div style="float:right;">
              <el-tag type="success">{{item.state}}</el-tag>
            </div>
            <div>
              <el-descriptions title="订单信息" :column="3" border>
                <el-descriptions-item label="订单号" >{{item.no}}</el-descriptions-item>
                <el-descriptions-item label="用户" :contentStyle='contentStyle' :labelStyle='labelStyle'>{{item.users.username}}</el-descriptions-item> <el-descriptions-item label="购买信息">
                  <el-button type="text" @click="more(item)">详情</el-button>
                </el-descriptions-item>
                <el-descriptions-item label="收货地址">{{item.place}}</el-descriptions-item>
                <el-descriptions-item label="操作" :contentStyle=buttonContentStyle>
                  <el-button type="primary" @click="send(item)">发货</el-button>
                  <el-button type="danger" @click="delupdata(item)">取消订单</el-button>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交易被取消" name="third">
        <div v-for="item in list" :key="item.id">
          <el-card class="box-card" size="mini">
            <div style="float:right;">
              <el-tag type="danger">{{item.state}}</el-tag>
            </div>
            <div>
              <el-descriptions title="订单信息" :column="3" border>
                <el-descriptions-item label="订单号" >{{item.no}}</el-descriptions-item>
                <el-descriptions-item label="用户" :contentStyle='contentStyle' :labelStyle='labelStyle'>{{item.users.username}}</el-descriptions-item> <el-descriptions-item label="购买信息">
                  <el-button type="text" @click="more(item)">详情</el-button>
                </el-descriptions-item>
                <el-descriptions-item label="收货地址">{{item.place}}</el-descriptions-item>
                <el-descriptions-item label="操作" :contentStyle=buttonContentStyle>
                  <el-button type="primary" @click="send(item)">发货</el-button>
                  <el-button type="danger" @click="delupdata(item)">取消订单</el-button>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
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
          <el-table-column prop="bookcontent" label="图书详情">
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
import {
  getAllAdminOrdersAPI,
  updataAdminOrdersAPI,
  delupdataAdminOrdersAPI
} from '@/api/OrderAPI'
import request from '@/utils/request'
export default {
  name: 'AdminOrder',
  data () {
    return {
      list: [],
      buttonContentStyle: { 'text-align': 'center' },
      contentStyle: {
        'text-align': 'center',
        width: '200px'
      },
      // label样式
      labelStyle: { width: '200px' },
      detailData: [],
      activeName: 'first',
      dialogVisible: false,
      param: '?state=待发货'
    }
  },
  methods: {
    async getAll (val) {
      const res = await getAllAdminOrdersAPI(val)
      this.list = res.data.data
      console.log(this.list)
    },
    async more (val) {
      this.dialogVisible = true
      const Data = { orderBooks: val.orderBooks }
      const { data } = await request.post('/orderbooks', Data)
      this.detailData = data.data
      console.log(data)
    },
    async send (val) {
      console.log(this.param)
      const { data } = await updataAdminOrdersAPI(val.id)
      console.log(data)
      this.getAll(this.param)
    },
    async delupdata (val) {
      const { data } = await delupdataAdminOrdersAPI(val.id)
      console.log(data)
      this.getAll(this.param)
    },
    handleClick (tab, event) {
      switch (tab.name) {
        case 'first':
          this.param = '?state=待发货'
          this.getAll(this.param)
          break
        case 'second':
          this.param = '?state=已发货'
          this.getAll(this.param)
          break
        case 'third':
          this.param = '?state=交易被取消'
          this.getAll(this.param)
          break
      }
    }
  },
  created () {
    this.getAll(this.param)
  },

  computed: {}
}
</script>

<style lang="less" scoped>
</style>
