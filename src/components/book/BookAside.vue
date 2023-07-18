<template>
  <div class="content">
    <div class="top">
       <el-card>
      <div style="display:flex">
        <el-input v-model="message" placeholder="请输入内容"></el-input>
    <el-button type="primary" icon="el-icon-search" size="mini" @click="search(message)">搜索</el-button>
      </div>
    </el-card>
    </div>
<div class="bottom">
    <el-card  >
      <span>分类筛选:</span>
      <hr>
    <div class="typeitem" >
      <div >
      <el-button @click="querytype('医学')">医学</el-button>
      <el-button @click="querytype('科普')">科普</el-button>
      <el-button @click="querytype('行为')">行为</el-button>
      <el-button @click="querytype('科研')">科研</el-button></div>
      <div style="margin-top: 10px;">
        <el-button @click="querytype('心理')">心理</el-button>
      </div>

    </div>
    </el-card>
</div>

  </div>
</template>

<script>
import bus from '@/components/book/EventBus'
export default {
  name: 'BookAside',
  data () {
    return {
      msg: '宠物之家',
      type: '',
      message: ''
    }
  },
  methods: {
    querytype (val) {
      this.message = ''
      this.type = val
      bus.$emit('share', val, '')
      bus.$emit('post', val, '')
      if (this.$route.path !== '/home/books/home') {
        this.$router.push('/home/books/home')
      }
    },
    search (val) {
      console.log(val)
      bus.$emit('share', '', val)
      bus.$emit('post', '', val)
      if (this.$route.path !== '/home/books/home') {
        this.$router.push('/home/books/home')
      }
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  float: right;

}
/*div内容*/
.content{
    width: 100%;
    /*高度自动,因为嵌套的div高度不确定,所以这里设置自动*/
    height: auto;

}
/*顶部div*/
.top{
    width: 352px;
    height: 200px;

    margin-left: 50%;
    /*需要设置绝对定位,才能用left*/
    position: relative;
    /*这里需要看width多少,left的值等于width的一半*/
    left: -200px;
}
/*底部div*/
.bottom{
    width: 352px;
    height: 200px;

    /*这里*/
    margin-left: 50%;
    position: relative;
    /*这里需要看width多少,left的值等于width的一半*/
    left: -200px;
}
</style>
