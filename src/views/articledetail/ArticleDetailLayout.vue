<template>
  <div  class="user-container" >
    <el-container >
       <el-main>
          <router-view name="ArticleContent"></router-view>
        </el-main>
        <el-aside width="465px">
         <DetailMessage></DetailMessage>
        </el-aside>
    </el-container>
  </div>
</template>

<script>
import DetailMessage from '@/views/articledetail/DetailMessage.vue'
export default {
  name: 'HomeLayout',
  components: {
    DetailMessage
  },
  created () {
    this.$emit('updateProjectId')
  }

}
</script>

<style lang="less" scoped>
.user-container {
  height: 100vh;
  margin-top: 30px;
  font-family: 'youlang';
  //  text-align: center;
}

</style>
