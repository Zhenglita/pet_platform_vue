<template>

  <div class="administrator">
    <el-container>
  <el-header><AdminHeader></AdminHeader></el-header>
  <el-container>
    <el-aside width="200px"><AdminSide></AdminSide></el-aside>
    <el-main><router-view name="acontent"></router-view></el-main>
  </el-container>
</el-container>

  </div>

</template>

<script>
import AdminSide from '@/components/subcomponents/AdminSide.vue'
import AdminHeader from '@/components/subcomponents/AdminUserHeader.vue'
export default {
  name: 'Administrator',
  components: {
    AdminSide,
    AdminHeader
  }
}
</script>

<style lang="less" scoped>
.el-header{
  height: 10vh;
  background-color: #ecf0f7;
}
.el-aside{
  height: 90vh;
  background-color: #ecf0f7;
}
.el-main{
  height: 90vh;

}
.administrator{
  height: 100vh;
   background-color: #f5f5f5;

}
</style>
