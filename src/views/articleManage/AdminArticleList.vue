<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
     >
      <el-table-column
      align="center"
        label="图片"
        width="180"
        height="10">
         <template v-slot="scope">
          <!-- <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.image"></el-avatar> -->
            <el-image :src="scope.row.image"></el-image>
          <!-- <img :src="scope.row.avatar" alt="" width="90" height="90" /> -->
        </template>
      </el-table-column>
      <el-table-column
      align="center"
        prop="title"
        label="文章标题"
       >
       </el-table-column>
        <!-- <el-table-column
        align="center"
        prop="message"
        label="内容"
        :show-overflow-tooltip="true"
       > -->
        <el-table-column width label="内容" align="center" prop="message">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" :content="row.message" placement="top">
              <div
                style="width:100%;padding: 0px;display: -webkit-box;-webkit-line-clamp:3;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;white-space: normal;line-height:18px;"
              >{{row.message}}</div>
            </el-tooltip>
              </template>
            </el-table-column>
      <!-- </el-table-column> -->
      <el-table-column
      align="center"
        prop="author"
        label="作者"
       >
      </el-table-column>
       <el-table-column
       align="center"
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
      align="center"
        prop="name"
        label="操作"
        width="200">
         <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleLook(scope.row)"
              >查看详情</el-button
            >

            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除文章</el-button
            >
          </template>
      </el-table-column>
    </el-table>
     <div class="block">
      <el-pagination class="pagiantion" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="pagination.pageSize" layout="total, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticleListAPI, deteleArticleAPI } from '@/api/articleAPI'
export default {
  name: 'AdminArticleList',
  data () {
    return {
      pagination: {
        // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 5, // 每页显示的记录数
        total: 0 // 总记录数
      },
      tableData: []

    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getAll () {
      const { data } = await getArticleListAPI(this.pagination.currentPage,
        this.pagination.pageSize, '')
      this.tableData = data.data.records
      this.pagination.total = data.data.total
      this.pagination.currentPage = data.data.current
      this.pagination.pageSize = data.data.size
      console.log(data)
    },
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      console.log(this.pagination.currentPage)
      this.getAll()
    },
    handleLook (val) {
      console.log(val)
      this.$router.push(
        {
          name: 'details',
          query: {
            id: val.aid
          }
        }
      )
      // this.$router.push('/home/detail/' + val.aid)
    },
    async handleDelete (val) {
      const { data } = await deteleArticleAPI(val.aid)
      console.log(data)
      this.getAll()
    }
  }

}
</script>

<style>

</style>
