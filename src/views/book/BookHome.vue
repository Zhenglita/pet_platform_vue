<template>
  <div class="user-container">
    <el-container>
      <el-aside style="width:25%;">
        <BookAside></BookAside>
      </el-aside>
      <!-- <el-container style="width: 70%;"> -->
        <el-main style="width:80%;">
          <router-view name="bookcontent"></router-view>
        </el-main>

      <!-- </el-container> -->
    </el-container>

  </div>
</template>

<script>
import BookAside from '@/components/book/BookAside.vue'
export default {
  name: 'BookHome',
  data () {
    return {

    }
  },
  components: {
    BookAside
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  height: 100vh;

}
</style>
