<template>
  <div>
    <div style="margin: 7px 0">
      <el-input
        style="width: 200px"
        placeholder="请输入名称"
        suffix-icon="el-icon-search"
        v-model="pagination.username"
      ></el-input>
      <el-input
        style="width: 200px"
        placeholder="请输入权限"
        suffix-icon="el-icon-message"
        class="ml-5"
        v-model="pagination.role"
      ></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleCreate"
        >新增 <i class="el-icon-circle-plus-outline"></i
      ></el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="sex" label="性别" width="80">
      </el-table-column>
      <el-table-column align="center" prop="sex" label="头像" width="80">
         <template v-slot="scope">
            <el-image :src="scope.row.avatar"></el-image>
          <!-- <img :src="scope.row.avatar" alt="" width="90" height="90"> -->
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" prop="email" label="电子邮箱">
      </el-table-column>
      <el-table-column align="center" prop="place" label="收货地址">
      </el-table-column>
      <el-table-column align="center" prop="role" label="权限">
        <template slot-scope="scope">
          <el-select
            v-model="values[scope.$index]"
            placeholder="未分配权限"
            @change="changerole($event, scope.row)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleUpdate(scope.row)" size="mini"
            >编辑 <i class="el-icon-edit"></i
          ></el-button>
          <el-button type="danger" @click="handleDelete(scope.row)" size="mini"
            >删除 <i class="el-icon-remove-outline"></i
          ></el-button>
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
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form
          ref="dataAddForm"
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="100px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-input v-model="formData.sex" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="formData.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收货地址">
                <el-input v-model="formData.place"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="权限" >
          <el-select
            v-model="addValue"
            placeholder="未分配权限"
            @change="addchangerole($event)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
              <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-input v-model="formData.sex" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="formData.email"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="收货地址">
                <el-input v-model="formData.place"></el-input>
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
</template>

<script>
import {
  getUsersPageAPI,
  getUsersIdAPI,
  deleteUsersAPI,
  updataUsersRoleAPI
} from '@/api/UserAPI'
import request from '@/utils/request'
export default {
  name: 'AdminUserContent',
  data () {
    return {
      dataList: [],
      username: '',
      email: '',
      address: '',
      options: [
        {
          value: '选项1',
          label: 'ROLE_ADMIN'
        },
        {
          value: '选项2',
          label: 'ROLE_BLOGGER'
        },
        {
          value: '选项3',
          label: 'ROLE_READER'
        }
      ],
      values: [],
      addValue: '',
      tableData: [],
      pagination: {
        // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的记录数
        total: 0, // 总记录数
        username: '',
        role: ''
      },
      param: '',
      dialogFormVisible4Edit: false,
      dialogFormVisible: false,
      formData: {

      },
      rules: {
        // 校验规则
        username: [
          { required: true, message: '用户名为必填项', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '性别为必填项', trigger: 'blur' }],
        role: [{ required: true, message: '权限为必填项', trigger: 'blur' }]
      }
    }
  },
  methods: {
    addchangerole (value) {
      const valueNew = this.options.find((ele) => ele.value === value).label
      this.formData.role = valueNew
    },
    async changerole (value, row) {
      // const {data}=await updataUsersRoleAPI(row)
      // this.value = row.role
      const valueNew = this.options.find((ele) => ele.value === value).label
      row.role = valueNew
      console.log(row)
      const { data } = await updataUsersRoleAPI(row).then(
        this.value = valueNew,
        console.log(this.value)
      )

      console.log(data)
    },
    // 切换页码
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.load()
    },
    async handleEdit () {
      const { data } = await request.put('/users', this.formData)
      console.log(data)
      this.dialogFormVisible4Edit = false
      this.load()
    },
    async handleUpdate (row) {
      console.log(row)
      const { data } = await getUsersIdAPI(row.uid)
      if (data.flag && data.data != null) {
        this.dialogFormVisible4Edit = true
        this.formData = data.data
        console.log(this.formData)
      } else {
        this.$message.error('数据同步失败，自动刷新')
      }
      this.load()
    },
    async load () {
      this.param = '?username=' + this.pagination.username
      this.param += '&role=' + this.pagination.role
      const { data } = await getUsersPageAPI(
        this.pagination.currentPage,
        this.pagination.pageSize,
        this.param
      )
      this.tableData = data.data.records
      this.values = data.data.records.map((v) => v.role)
      this.pagination.total = data.data.total
      this.pagination.currentPage = data.data.current
      this.pagination.pageSize = data.data.size
    },
    cancel () {
      this.dialogFormVisible4Edit = false
      this.dialogFormVisible = false
      this.resetForm()
      this.$message.info('当前操作取消')
    },
    // 重置表单
    resetForm () {
      this.formData = {}
    },
    handleCreate () {
      this.dialogFormVisible = true
      this.resetForm()
    },
    async handleAdd () {
      const { data } = await request.post('/users', this.formData)
      if (data.flag) {
        this.dialogFormVisible = false
        this.$message.success('成功')
        this.addValue = ''
      } else {
        this.$message.error('失败')
      }
      // 刷新数据
      this.load()
    },
    // 删除
    async handleDelete (row) {
      const { data } = await deleteUsersAPI(row.uid)
      this.$confirm('此操作永久删除信息，是否继续', '提示', { type: 'info' })
        .then(() => {
          if (data.flag) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('数据同步失败，自动刷新')
          }
          this.load()
        })
        .catch(() => {
          this.$message.info('取消成功')
        })

      console.log(data)
    }
  },
  created () {
    this.load()
  }
}
</script>

<style lang="less" scoped>
.headerBg {
  background: #eee !important;
}
</style>
