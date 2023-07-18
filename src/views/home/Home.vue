<template>
  <div class="home-container">
    <!-- 同步区域 :fixed="true"固定在头部-->
    <div style="margin-left: 0px;">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in pic" :key="item.id">
          <img :src="item.url" style="width: 100%;height:100%"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div>{{pagination.message}}</div> -->
    <!-- 导入注册使用组件 -->
    <ArticleInfo
      v-for="item in artlist"
      :key="item.aid"
      :id="item.aid"
      :title="item.title"
      :author="item.author"
      :comm_count="item.comment"
      :pubdate="item.date"
      :image="item.image"
      :message="item.message"
    ></ArticleInfo>
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
// import request from '@/utils/request'
import bus from '@/components/home/EventBus'
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/article/ArticleInfo'
export default {
  name: 'Home',
  data () {
    return {
      param: {},
      title: '',
      type: '',
      user: {},
      pagination: {
        // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的记录数
        total: 0, // 总记录数
        message: ''

      },
      artlist: [],
      totalartlist: [],
      pic: [
        {
          id: 1,
          url: 'https://img0.baidu.com/it/u=3389334550,212807088&fm=253&fmt=auto&app=138&f=JPEG?w=1200&h=500'
        },
        {
          id: 2,
          url: 'https://img2.baidu.com/it/u=3821275601,338587354&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=500'
        }, {
          id: 3,
          url: 'https://img0.baidu.com/it/u=3016736027,583760348&fm=253&fmt=auto&app=138&f=PNG?w=1200&h=500'
        }
      ],
      // 是否正在加载数据，为ture不触发load事件
      // 当下一页请求回来之后，改回true
      loading: true,
      // 所有数据是否加载完了，如果没有更多数据，改为true
      finished: false,
      // 下拉刷新,是否正在下拉刷新
      isLoading: false
    }
  },
  methods: {
    async getAll () {
      this.param = '?title=' + this.title + '&type=' + this.type
      const { data } = await getArticleListAPI(
        this.pagination.currentPage,
        this.pagination.pageSize,
        this.param
      )
      console.log(data.data)
      this.artlist = data.data.records
      this.pagination.total = data.data.total
      this.pagination.currentPage = data.data.current
      this.pagination.pageSize = data.data.size
    },
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      console.log(this.pagination.currentPage)
      // 请求第二页数据，进行拼接
      this.getAll()
    }

  },
  components: {
    ArticleInfo
  },
  created () {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : {}
    this.getAll()
    bus.$on('return', val => {
      this.title = val
      this.getAll()
    })
    bus.$on('type', val => {
      console.log('1111')
      this.type = val
      this.title = ''
      this.getAll()
    })
  },
  // B.vue
  beforeDestroy () {
    bus.$off('share')
    bus.$off('return')
    bus.$off('type')
  },

  mounted () {
    bus.$on('share', val => {
      this.title = val
      this.type = ''
      this.getAll()
    })
    bus.$on('type', val => {
      this.type = val
      this.title = ''
      this.getAll()
      console.log(this.artlist)
    })
    this.visible = !this.visible
  }

}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  //上右下左
  //  position: relative;
  padding: 0px 0 50px 0;
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
