<template>
  <div class="home-container">
      <el-header style="margin-top: -30px">
        <MyHeader></MyHeader>
      </el-header>
      <!-- 第一个页面 -->
      <!-- <el-container>
        <el-aside width="200px">
          <router-view name="nav"></router-view>
        </el-aside>
        <el-main>
          <router-view name="content"></router-view>
        </el-main>
      </el-container> -->
      <!-- 第2个页面 -->
      <el-container>
        <el-main>
          <router-view name="content1"></router-view>
        </el-main>
        <el-aside width="465px">
          <router-view name="nav1"></router-view>
        </el-aside>
      </el-container>

    <!-- 第3个页面 -->
    <el-container class="home" style="height: 92%">
      <el-main id="home_main" ref="scorll_top" @scroll_passive="getScroll($event)">
        <router-view name="content2" @updateProjectId="updateProjectIdParent"></router-view>
        <!-- <button @click="istop">111</button> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from '@/components/subcomponents/MyHeader.vue'

export default {
  name: 'MyHome',

  components: {
    MyHeader
  },
  mounted () {
    window.addEventListener('scroll', this.getScroller, true)
  },
  methods: {
    getScroller (event) {
      // console.log('滚动最大值', event.target.scrollHeight)
      // console.log('滚动距离', event.target.scrollTop)
      // console.log('固定距离', event.target.clientHeight)
    },
    updateProjectIdParent () {
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById('home_main').scrollTop = 0
        })
      })
      document.body.scrollTop = this.target
    }
  }

}
</script>

<style lang="less" scoped>
.home{
  background-color: #f5f5f5;
}
.home-container {
  height: 100%;
  background-color: #f5f5f5;
}
</style>
