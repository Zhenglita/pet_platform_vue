<template>
  <div class="container">
    <div class="box">
      <div class="filter-container">
        <div style="display: flex">
          <h4>图书类别：</h4>
          <el-input
            placeholder="图书类别"
            v-model="pagination.type"
            style="width: 200px"
            class="filter-item"
          ></el-input>

          <h4>图书名称：</h4>
          <el-input
            placeholder="图书名称"
            v-model="pagination.name"
            style="width: 200px"
            class="filter-item"
          ></el-input>

          <h4>图书描述：</h4>
          <el-input
            placeholder="图书描述"
            v-model="pagination.description"
            style="width: 200px"
            class="filter-item"
          ></el-input>
        </div>
        <div class="selectbtn">
          <el-button @click="getAll()" class="dalfBut" size="small"
            >查询</el-button
          >
          <el-button
            type="primary"
            class="butT"
            @click="handleCreate()"
            size="small"
            >新建</el-button
          >
        </div>
      </div>
      <el-table
        size="small"
        current-row-key="id"
        :data="dataList"
        stripe
        highlight-current-row
      >
        <el-table-column
          type="index"
          align="center"
          label="序号"
        ></el-table-column>

        <el-table-column
          prop="type"
          label="图书类别"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="图书名称"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="description"
          label="描述"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.row)"
              >编辑</el-button
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
      <!--分页组件-->
      <div class="pagination-container">
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
      <!-- 新增标签弹层 -->

      <div class="add-form">
        <el-dialog title="新增图书" :visible.sync="dialogFormVisible">
          <el-form
            ref="dataAddForm"
            :model="formData"
            :rules="rules"
            label-position="right"
            label-width="100px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="图书类别" prop="type">
                  <el-input v-model="formData.type" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="图书名称" prop="name">
                  <el-input v-model="formData.name" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="描述">
                  <el-input
                    v-model="formData.description"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取消</el-button>

            <el-button type="primary" @click="handleAdd()">确定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 编辑标签弹层 -->

      <div class="updata-form">
        <el-dialog title="编辑检查项" :visible.sync="dialogFormVisible4Edit">
          <el-form
            ref="dataEditForm"
            :model="formData"
            :rules="rules"
            label-position="right"
            label-width="100px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="图书类别" prop="type">
                  <el-input v-model="formData.type" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="图书名称" prop="name">
                  <el-input v-model="formData.name" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="描述">
                  <el-input
                    v-model="formData.description"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取消</el-button>

            <el-button type="primary" @click="handleEdit()">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBooksPageAPI,
  deleteBooksAPI,
  getBooksByIdAPI
} from '@/api/BooksAPI'
import request1 from '@/utils/request'
export default {
  name: 'Book',
  data () {
    return {
      param: {},
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {
        // 校验规则
        type: [
          { required: true, message: '图书类别为必填项', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '图书名称为必填项', trigger: 'blur' }
        ]
      },
      pagination: {
        // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 5, // 每页显示的记录数
        total: 0, // 总记录数
        type: '',
        name: '',
        description: ''
      }
    }
  },
  methods: {
    // async getAll () {
    //   // 发送异步请求
    //   // const { data } = await getAllBooksAPI()
    //   // this.dataList = data.data
    //   // console.log(this.dataList)
    //   const { data } = await getBooksPageAPI(this.pagination.currentPage, this.pagination.pageSize)
    //   this.dataList = data.data
    //   console.log(this.dataList)
    // },

    // 分页查询
    async getAll () {
      this.param = '?type=' + this.pagination.type
      this.param += '&name=' + this.pagination.name
      this.param += '&description=' + this.pagination.description
      const { data } = await getBooksPageAPI(
        this.pagination.currentPage,
        this.pagination.pageSize,
        this.param
      )
      this.dataList = data.data.records
      this.pagination.total = data.data.total
      this.pagination.currentPage = data.data.current
      this.pagination.pageSize = data.data.size
    },

    // 切换页码
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getAll()
    },

    // 弹出添加窗口
    handleCreate () {
      this.dialogFormVisible = true
      this.resetForm()
    },

    // 重置表单
    resetForm () {
      this.formData = {}
    },

    // 添加
    async handleAdd () {
      const { data } = await request1.post('/books', this.formData)
      if (data.flag) {
        this.dialogFormVisible = false
        this.$message.success(data.msg)
      } else {
        this.$message.error(data.msg)
      }
      // 刷新数据
      this.getAll()
    },

    // 取消
    cancel () {
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.resetForm()
      this.$message.info('当前操作取消')
    },

    // 删除
    async handleDelete (row) {
      const { data } = await deleteBooksAPI(row.id)
      this.$confirm('此操作永久删除信息，是否继续', '提示', { type: 'info' })
        .then(() => {
          if (data.flag) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('数据同步失败，自动刷新')
          }
          this.getAll()
        })
        .catch(() => {
          this.$message.info('取消成功')
        })

      console.log(data)
    },

    // 弹出编辑窗口
    async handleUpdate (row) {
      const { data } = await getBooksByIdAPI(row.id)
      if (data.flag && data.data != null) {
        this.dialogFormVisible4Edit = true
        this.formData = data.data
      } else {
        this.$message.error('数据同步失败，自动刷新')
      }
      this.getAll()
    },

    // 修改
    async handleEdit () {
      const { data } = await request1.put('/books', this.formData)
      console.log(data)
      this.dialogFormVisible4Edit = false
      this.getAll()
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style scoped lang="less">
h4 {
  margin-top: 10px;
  margin-left: 50px;
}
.selectbtn {
  margin-right: 30px;
  margin-bottom: 10px;
  float: right;
  border: 1px solid #000000;
}
</style>
