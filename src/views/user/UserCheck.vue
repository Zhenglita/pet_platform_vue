<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
        align="center"
        label="图片"
        width="180"
       >
  <template v-slot="scope">
            <el-image :src="scope.row.image"></el-image>
          <!-- <img :src="scope.row.avatar" alt="" width="90" height="90"> -->
        </template>
      </el-table-column>
      <el-table-column
      align="center"
        prop="title"
        label="标题"
         width="300"
       >
      </el-table-column>
      <!-- <el-table-column
        prop="message"
        label="内容"
        :show-overflow-tooltip="true"
       >
      </el-table-column> -->
       <el-table-column width label="内容" align="center" prop="message">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" :content="row.message" placement="top">
              <div
                style="width:100%;padding: 0px;display: -webkit-box;-webkit-line-clamp:3;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;white-space: normal;line-height:18px;"
              >{{row.message}}</div>
            </el-tooltip>
              </template>
            </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
      align="center"
        prop="name"
        label="操作"
        width="200">
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
</template>

<script>
import { getArticleByAdbleListAPI, deteleArticleAPI } from '@/api/articleAPI'

export default {

  data () {
    return {
      tableData: [],
      user: {}
    }
  },
  methods: {
    async getAll () {
      const { data } = await getArticleByAdbleListAPI(false, this.user.uid)
      this.tableData = data.data
      console.log(this.tableData)
    },

    async handleDelete (value) {
      console.log(value)
      const { data } = await deteleArticleAPI(parseInt(value.aid))
      console.log(data)
      this.getAll()
    }
  },
  created () {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    console.log(this.user)

    this.getAll()
  },
  mounted () {

  }
}
</script>

<style>

</style>
