<template>
  <div class="user-container">
      <!-- <el-image
      style="width: 100%; height: 100px;margin-top:-70px"
      src="https://img1.baidu.com/it/u=2190327561,60083733&fm=253&fmt=auto&app=138&f=JPEG?w=1180&h=312"
      fit="fill"></el-image> -->
<div style="width:100%;margin-bottom:40px;margin-top:-50px">
  <div style="width:102%;height:160px;display:flex;align-items:center;margin-left:-20px" class="wwww">
<h1 v-show="visible" style="font-family:Arial, Helvetica, sans-serif;font-size:30px;color:#ffffff;margin-left:140px">爪迹天地</h1>
  </div>
  <!-- <h1 v-show="visible" style="font-family:Arial, Helvetica, sans-serif;font-size:30px;color:#5f5f5f;" class="titles" >科普宠物知识平台</h1> -->
</div>
<div style="display:flex;width:100%;margin-bottom:40px;">
  <!-- <div style=""> -->
    <div v-for="o in bookslist" :key="o.id" class="text_item" style="width:100%;height:200px;margin-bottom:0px;justify-content: center;">
      <el-card style="width:70%;height: 220px;margin-left: 15%;">
      <el-image
      style="width: 140px; height: 140px"
      :src="o.image"
      fit="fill"></el-image>
        <h3 style="text-align: center;font-family: 'youlang';margin-top: 0px;">{{o.name}}</h3>
        </el-card>

      </div>
  <!-- </div> -->
  </div>

    <el-container>
      <el-aside width="15%" >
         <HomeAsideLeft></HomeAsideLeft>
        </el-aside>
       <el-main width="50%" style="margin-left:5%">
          <router-view name="homecontent"></router-view>
        </el-main>
        <el-aside width="30%">
         <HomeAside></HomeAside>
        </el-aside>
    </el-container>

  </div>
</template>

<script>
import HomeAside from '@/components/home/HomeAside.vue'
import HomeAsideLeft from '@/components/home/HomeAsideLeft.vue'
import { getTopBooksAPI } from '@/api/BooksAPI'
export default {
  name: 'HomeLayout',
  data () {
    return {
      visible: false,
      bookslist: []
    }
  },
  components: {
    HomeAside,
    HomeAsideLeft
  },
  created () {
    this.getBooks()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    async getBooks () {
      const { data } = await getTopBooksAPI()
      console.log(data)
      this.bookslist = data.data
    }
  },
  mounted () {
    this.visible = true
  }
}
</script>

<style lang="less" scoped>
.user-container {
  height: 100vh;
  margin-top: 30px;
   text-align: center;
}
.titles{
  width: 100%;
  display: inline;
  background-image: url('@/assets/beijin.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

}
.animate__animated{
  width: 100%;
}
.wwww{
  background-image: url('@/assets/beijin.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
