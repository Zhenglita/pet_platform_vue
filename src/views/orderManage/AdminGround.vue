<template>
  <div>
    <div style="background:#FFFFFF">

      <el-row style="padding-top:30px">
        <el-col :span="2" style="margin-left:30px;">
          <div class="grid-content bg-purple">
            <h4 style="margin-left:30px;margin-top:12px">图书名称</h4>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="bookname" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="2" style="margin-left:30px">
          <div class="grid-content bg-purple">
            <h4 style="margin-left:30px;margin-top:12px">图书作者</h4>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="author" placeholder="请输入图书作者名字"></el-input>
          </div>
        </el-col>
        <el-col :span="2" style="margin-left:30px">
          <div class="grid-content bg-purple">
            <h4 style="margin-left:30px;margin-top:12px">上架状态</h4>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <template>
              <el-select v-model="options.value" filterable placeholder="选择上架状态" @change="changerole(options.value)">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
            <!-- <el-input v-model="enable" placeholder="请输入内容"></el-input> -->
          </div>
        </el-col>
        <el-col :span="3" style="margin-left:30px">
          <div class="grid-content bg-purple" style="display:flex"><el-button type="primary" @click="this.getAll">搜索</el-button><el-button type="info" @click="reset()">重置</el-button></div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:10px;margin-bottom:10px">
      <el-button type="primary" @click="GroundingMore()">批量上架</el-button>
      <el-button type="info" @click="UnderMore()">批量下架</el-button>
      <el-button type="primary" @click="addBooksDialog()">新增图书</el-button>
      <!-- <el-button type="primary" @click="vouchersDialog()">代金券管理</el-button> -->
    </div>
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed prop="bookname" label="图书名称" width="150">
      </el-table-column>
      <el-table-column prop="image" label="图书封面" width="120">
        <template v-slot="scope">
          <img :src="scope.row.image" alt="" width="90" height="90">
        </template>
      </el-table-column>
      <el-table-column prop="type" label="图书类型" width="120">
      </el-table-column>
      <el-table-column prop="price" label="图书价格" width="120">
      </el-table-column>
      <!-- <el-table-column prop="bookcontent" label="图书介绍" width="300">

      </el-table-column> -->
       <el-table-column width label="图书介绍" align="center" prop="bookcontent">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" :content="row.bookcontent" placement="top">
              <div
                style="width:100%;padding: 0px;display: -webkit-box;-webkit-line-clamp:3;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;white-space: normal;line-height:18px;"
              >{{row.bookcontent}}</div>
            </el-tooltip>
              </template>
            </el-table-column>
      <el-table-column prop="author" label="图书作者" width="120">
      </el-table-column>
      <el-table-column prop="quantity" label="图书库存" width="120">
      </el-table-column>
    <el-table-column prop="enable" label="代金券设置" width="120">
        <template slot-scope="scope">
          <el-button @click="checkVoucher(scope.row)" type="text" size="small">
            查看代金券
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="上架状态" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enable=== true" type="success">已上架</el-tag>
          <el-tag v-else-if="scope.row.enable=== false" type="info">未上架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="press" label="图书出版社" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.$index, tableData)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click="Del(scope.$index, tableData)" type="text" size="small">
            删除
          </el-button>
          <el-button v-if="scope.row.enable===true"  @click="Undercarriage(scope.$index, tableData)" type="text" size="small">
            下架
          </el-button>
           <el-button v-else-if="scope.row.enable===false"   @click="Grounding(scope.$index, tableData)" type="text" size="small">
            上架
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-form">
      <el-dialog title="新增图书" :visible.sync="dialogAddVisible" @close='cancel'>
        <el-form  :model="formData" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-upload
              ref="upload"
              style="margin-left:80px;margin-bottom:0px"
              :action=uploadUrl
               list-type="picture-card"
               :limit="1"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书名称" prop="bookname">
                <el-input v-model="formData.bookname" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书作者" prop="author">
                <el-input v-model="formData.author" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书价格" prop="price">
                <el-input v-model="formData.price" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书类别" prop="type">
                <el-input v-model="formData.type" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书库存" prop="quantity">
                <el-input v-model="formData.quantity" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出版社" prop="press">
                <el-input v-model="formData.press"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者介绍" prop="authorcontent">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.authorcontent">
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内容介绍" prop="bookcontent">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.bookcontent">
                </el-input>
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
  <div class="add-form">
      <el-dialog title="编辑图书" :visible.sync="dialogEditVisible" @close='cancel'>
        <el-form  :model="formData" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item style="text-align: center" label-width="0">
               <el-upload
               ref="upload"
              class="avatar-uploader"
              :action=uploadUrl
              :on-remove="handleRemove"
              :show-file-list="false"
              :on-success="handleAvatarEditSuccess"
          >
          <!-- <el-image v-if="formData.image"
      style="width: 140px; height: 150px"
      :src="formData.image"
      fit="fill"></el-image> -->
            <img v-if="formData.image" style="width: 140px; height: 150px" :src="formData.image" class="avatar">
            <i v-else style="width: 140px; height: 50px;" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书名称" prop="bookname">
                <el-input v-model="formData.bookname" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书作者" prop="author">
                <el-input v-model="formData.author" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书价格" prop="price">
                <el-input v-model="formData.price" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书类别" prop="type">
                <el-input v-model="formData.type" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图书库存" prop="quantity">
                <el-input v-model="formData.quantity" />
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="出版社" prop="press">
                <el-input v-model="formData.press"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者介绍" prop="authorcontent">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.authorcontent">
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内容介绍" prop="bookcontent">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.bookcontent">
                </el-input>
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
      <div class="vouvher-form">
      <el-dialog title="新增代金券" :visible.sync="dialogAddVoucherVisible" @close='cancel'>
        <el-form  :model="formData" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="代金券标题" prop="title">
                <el-input v-model="formData.title" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="购买金额" prop="pay_value">
                <el-input v-model="formData.pay_value" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="抵扣金额" prop="actual_value">
                <el-input v-model="formData.actual_value" />
              </el-form-item>
            </el-col>
             <el-col :span="24">
              <el-form-item label="使用规则" prop="rules">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.rules" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="addVoucher()">确定</el-button>
        </div>
      </el-dialog>
    </div>
          <div class="vouvher-form">
      <el-dialog title="本图书可用代金券" :visible.sync="dialogVoucherVisible" @close='cancel'>
         <el-row>
  <el-col :span="24" v-for="(o,index) in voucherFormData"  :key="index" >
 <el-card :body-style="{ padding: '0px' }">
      <div style="padding: 14px;">
        <div>
          <b>{{o.actual_value}}元代金券</b>
        </div>
        <div style="display: flex;">
           <div style="margin-top:20px">{{o.rules}}</div>
           <div style="margin-left:auto;">
           <div style="margin-left:10px;margin-top:8px"><span style="font-size:14px" v-if="o.type===true">剩余{{o.stock}}张</span></div></div>
        </div>
        <div style="display: flex;margin-top:8px" >
          <div>售价：￥{{o.pay_value}}(元)</div>
          <el-tag type="danger" size="mini" style="margin-left:10px">8折</el-tag>
          <div style="margin-left:auto;"><time class="time" style="font-size:14px" v-if="o.type===false">有效期：{{o.time}}全年</time>
          <time class="time" style="font-size:14px" v-else>秒杀时间：{{o.begin}}~~~~{{o.end}}</time></div>
        </div>
      </div>
    </el-card>

  </el-col>
  </el-row>

      <el-button type="primary" @click="addVouchersDialog()">新增代金券</el-button>
      <el-button type="primary" @click="addSeckillVouchersDialog()">新增秒杀优惠券</el-button>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="addVoucher()">确定</el-button>
        </div>
      </el-dialog>
    </div>
     <div class="vouvher-form">
      <el-dialog title="新增秒杀代金券" :visible.sync="dialogSeckillVoucherVisible" @close='cancel'>
        <el-form  :model="formData" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="代金券标题" prop="title">
                <el-input v-model="formData.title" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="购买金额" prop="pay_value">
                <el-input v-model="formData.pay_value" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="抵扣金额" prop="actual_value">
                <el-input v-model="formData.actual_value" />
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="库存" prop="stock">
                <el-input v-model="formData.stock"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">

      <el-form-item label="秒杀时间" prop="">
    <el-date-picker
      v-model="formData.time"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
      </el-form-item>

            </el-col>
          </el-row>
          <el-row>
             <el-col :span="24">
              <el-form-item label="使用规则" prop="rules">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.rules" />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>

          <el-button type="primary" @click="addKill()">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="block">
      <el-pagination class="pagiantion" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="pagination.pageSize" layout="total, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getBooksAllPageAPI, saveBooks, updataBooks, deleteBooksAPI, updataBooksList, updataBooksUnderList } from '@/api/BooksAPI'
import { getVoucherByBookAPI, addVoucherAPI, addKillVoucherAPI } from '@/api/VoucherAPI'
import upload from '@/components/upload'
export default {
  name: 'AdminGround',
  data () {
    return {
      dialogEditVisible: false,
      dialogAddVisible: false,
      dialogVoucherVisible: false,
      dialogSeckillVoucherVisible: false,
      dialogAddVoucherVisible: false,
      uploadUrl: '',
      value: '',
      pagination: {
        // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 5, // 每页显示的记录数
        total: 0 // 总记录数
      },
      options: [
        {
          value: 'true',
          label: '已上架'
        },
        {
          value: 'false',
          label: '未上架'
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        image: ''
      },
      enable: '',
      author: '',
      bookname: '',
      book: {},
      tableData: [],
      formData: {
        image: ''
      },
      voucherFormData: [],
      addVoucherFormData: [],
      multipleSelection: []
    }
  },
  methods: {
    async Del (index, rows) {
      const res = await deleteBooksAPI(rows[index].id)
      console.log(res)
      this.getAll()
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
      console.log(fileList)
    },
    async handleEdit () {
      const res = await updataBooks(this.formData)
      console.log(res)
      this.$refs.upload.clearFiles()
      this.dialogEditVisible = false
    },
    cancel () {
      this.formData = {}
      this.voucherFormData = []
      this.book = {}
      this.dialogAddVisible = false
      this.dialogEditVisible = false
      this.dialogVoucherVisible = false
      this.dialogAddVoucherVisible = false
      this.dialogSeckillVoucherVisible = false
    },
    async handleAdd () {
      await saveBooks(this.formData)
      this.$refs.upload.clearFiles()
      this.dialogAddVisible = false
      this.formData = {}
      this.$message.success('增加成功')
    },
    async addVoucher () {
      this.formData.book_id = this.book.id
      await addVoucherAPI(this.formData)
      this.dialogAddVoucherVisible = false
      this.formData = {}
      this.book = {}
      this.$message.success('增加成功')
    },
    async addKill () {
      this.formData.book_id = this.book.id
      await addKillVoucherAPI(this.formData)
      this.dialogSeckillVoucherVisible = false
      this.formData = {}
      this.book = {}
      this.$message.success('增加成功')
    },
    async checkVoucher (temp) {
      if (temp.voucher_enable === true) {
        const { data } = await getVoucherByBookAPI(temp.id)
        this.voucherFormData = data.data
        this.book = temp
        console.log(this.voucherFormData)
        this.dialogVoucherVisible = true
      }
    },
    addBooksDialog () {
      this.dialogAddVisible = true
    },
    addVouchersDialog () {
      this.dialogAddVoucherVisible = true
    },
    addSeckillVouchersDialog () {
      this.dialogSeckillVoucherVisible = true
    },
    reset () {
      this.bookname = ''
      this.author = ''
      this.enable = ''
      this.getAll()
    },
    changerole (v) {
      console.log(v)
      this.enable = v
    },
    async getAll () {
      this.param = '?bookname=' + this.bookname
      this.param += '&author=' + this.author
      this.param += '&enable=' + this.enable
      const { data } = await getBooksAllPageAPI(
        this.pagination.currentPage,
        this.pagination.pageSize,
        this.param
      )
      console.log(data)
      this.tableData = data.data.records
      this.pagination.total = data.data.total
      this.pagination.currentPage = data.data.current
      this.pagination.pageSize = data.data.size
    },
    async Edit (index, rows) {
      console.log(rows[index])
      this.formData = rows[index]
      this.dialogEditVisible = true
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      console.log(this.pagination.currentPage)
      this.getAll()
    },
    handlePictureCardPreview (res) {
      this.ImageUrl = res
      this.dialogVisible = true
    },
    handleAvatarSuccess (event, file, fileList, row) {
      console.log(fileList)
      this.formData.image = fileList[0].response
      // if (this.formData.image === '') {
      //   this.formData.image = res
      // } else {
      //   this.formData.image += '&' + res
      // }
      // console.log(this.formData.image)
      // this.$message.success('上传成功')
      // this.update()
    },
    handleAvatarEditSuccess (event, file, fileList, row) {
      this.formData.image = fileList[0].response
      this.$message.success('上传成功')
    },
    async Undercarriage (index, rows) {
      this.formData = rows[index]
      this.formData.enable = false
      const res = await updataBooks(this.formData)
      console.log(res)
      // this.getAll()
    },
    async Grounding (index, rows) {
      this.formData = rows[index]
      this.formData.enable = true
      const res = await updataBooks(this.formData)
      console.log(res)
      // this.getAll()
    },
    async GroundingMore () {
      const res = await updataBooksList(this.multipleSelection)
      console.log(res)
      this.getAll()
    },
    async UnderMore () {
      const res = await updataBooksUnderList(this.multipleSelection)
      console.log(res)
      this.getAll()
    }
  },
  created () {
    this.getAll()
    this.uploadUrl = upload
  }
}
</script>

<style >
</style>
