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
        prop="articlename"
        label="文章"
       >
       </el-table-column>
        <el-table-column
        prop="real_content"
        label="评论内容"
       >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户"
       >
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
              @click="handleWarn(scope.row)"
              >警告用户</el-button
            >

            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除评论</el-button
            >
          </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getAllMessagesAdminAPI, deleteMessagesAPI } from '@/api/CommentAPI'
import { addwranAPI } from '@/api/MessageAPI'
export default {
  name: 'Sensitive',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getall () {
      const { data } = await getAllMessagesAdminAPI()
      this.tableData = data.data
      console.log(data)
    },
    async handleWarn (value) {
      console.log(value)
      const { data } = await addwranAPI(value)
      console.log(data)
    },
    async handleDelete (value) {
      const { data } = await deleteMessagesAPI(value.id)
      console.log(data)
      this.getall()
    }
  },

  created () {
    this.getall()
  }

}
</script>

<style >

</style>
