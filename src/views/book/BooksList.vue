<template>
  <div class="userbooks-container">

    <!-- 导入注册使用组件 -->
<div style="display:flex">
  <div>
     <BookInfo
      v-for="item in artlistleft"
      :key="item.id"
      :bid="item.id"
      :type="item.type"
      :press="item.press"
      :bookname="item.bookname"
      :author="item.author"
      :authorcontent="item.authorcontent"
      :bookcontent="item.bookcontent"
      :image="item.image"
      :quantity="item.quantity"
      :price="item.price"
      :enable="item.enable"
    ></BookInfo>
  </div>
   <div>
    <BookInfo
      v-for="item in artlistright"
      :key="item.id"
      :bid="item.id"
      :type="item.type"
      :press="item.press"
      :bookname="item.bookname"
      :author="item.author"
      :authorcontent="item.authorcontent"
      :bookcontent="item.bookcontent"
      :image="item.image"
      :quantity="item.quantity"
      :price="item.price"
      :enable="item.enable"
    ></BookInfo>
   </div>

</div>

    <div class="block">
        <el-pagination
          class="pagiantion"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
    </div>
  </div>
</template>

<script>
import bus from '@/components/book/EventBus'
import { getBooksAllPageAPI } from '@/api/BooksAPI'
import BookInfo from '@/components/book/BookInfo.vue'
export default {
  name: 'BooksList',
  data () {
    return {
      param: '',
      bookname: '',
      type: '',
      pagination: {
        // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的记录数
        total: 0 // 总记录数

      },
      artlist: [],
      artlistleft: [],
      artlistright: []
    }
  },
  methods: {
    async getAll () {
      this.param = '?bookname=' + this.bookname
      this.param += '&type=' + this.type
      this.param += '&enable=' + 'true'
      const { data } = await getBooksAllPageAPI(
        this.pagination.currentPage,
        this.pagination.pageSize,
        this.param
      )
      this.artlist = data.data.records
      this.artlistleft = []
      this.artlistright = []
      this.artlist.forEach((v, i) => {
        if (i % 2 === 0) {
          // console.log(i)
          this.artlistleft[i / 2] = v
          // this.artlist.splice(i, 1)
        } else {
          this.artlistright[(i - 1) / 2] = v
        }
      })
      console.log(this.artlistright)
      this.pagination.total = data.data.total
      this.pagination.currentPage = data.data.current
      this.pagination.pageSize = data.data.size
    },
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      console.log(this.pagination.currentPage)
      this.getAll()
    },
    async begin () {
      await bus.$on('end', (val, message) => {
        this.type = val
        this.bookname = message
        this.getAll()
      })
      if (this.artlist.length === 0) { this.getAll() }
    }

  },
  components: {
    BookInfo
  },
  created () {
    // bus.$on('end', (val, message) => {
    //   this.type = val
    //   this.bookname = message
    //   this.getAll()
    // })
    // if (this.artlist.length === 0) { this.getAll() }
    this.begin()
  },
  mounted () {
    bus.$on('share', (val, message) => {
      this.type = val
      this.bookname = message
      this.getAll()
    })
  },
  beforeDestroy () {
    bus.$off('end')
    // bus.$off('search')
    bus.$off('share')
  }

  // 另外一个组件的我就不放出来了

}
</script>

<style lang="less" scoped>
.userbooks-container {
  //上右下左
  //  position: relative;
  // padding: 0px 0 50px 0;
  // margin-left: 100px;
  margin-top: -20px;
}
.van-nav-bar {
  background-color: pink;
}
/deep/.van-nav-bar__title {
  color: aqua;
}
.block {
  position: relative;
  left: 200px;
  width: 100px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-pagination {
  padding-top: 200px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-pagination {
  padding-top: 10px;
}
</style>
