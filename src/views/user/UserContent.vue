<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="createtime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="点赞数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="count"
        label="回复数"
        width="80">
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
              >查看</el-button
            >

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
import { getMessagesAPI, deleteMessagesAPI } from '@/api/CommentAPI'

export default {
  data () {
    return {
      user: {},
      tableData: []
    }
  },
  methods: {
    async getAll () {
      console.log(this.user)
      const { data } = await getMessagesAPI(this.user.uid)
      this.tableData = data.data
      console.log(this.tableData)
    },
    handleLook (value) {
      console.log(value)
      this.$router.push(
        {
          name: 'details',
          query: {
            id: value.foregin_id
          }
        }
      )
      // this.$router.push('/home/detail/' + value.foregin_id)
    },
    async handleDelete (value) {
      const { data } = await deleteMessagesAPI(value.id)
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
