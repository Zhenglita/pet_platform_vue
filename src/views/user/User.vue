<template>
  <div class="user-container">

    <el-container>
      <el-aside width="480px">
        <UserAside></UserAside>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
              <!-- <router-link to="/home/users/home"> -->
                已发表文章
             <!-- </router-link> -->
            </el-menu-item>
            <el-menu-item index="2">
              <!-- <router-link to="/home/users/add"> -->
                发表文章
               <!-- </router-link> -->
            </el-menu-item>
            <el-menu-item index="3">
              <!-- <router-link to="/home/users/check"> -->
                正在审核中
               <!-- </router-link> -->
            </el-menu-item>
            <el-menu-item index="4">
              <!-- <router-link to="/home/users/cart"> -->
                购物车
             <!-- </router-link> -->
            </el-menu-item>
            <el-menu-item index="5">
              <!-- <router-link to="/home/users/mycomment"> -->
                我的评论
               <!-- </router-link> -->
            </el-menu-item>
            <el-menu-item index="6">
              <!-- <router-link to="/home/users/userfollow"> -->
                我的关注
              <!-- </router-link> -->
            </el-menu-item>
            <el-menu-item index="7">
              <!-- <router-link to="/home/users/userchat"> -->
                我的消息
              <!-- </router-link> -->
            </el-menu-item>
            <el-menu-item index="8" v-if="user.role===role"  @click="$router.push('/Administrator')">后台管理</el-menu-item>
          </el-menu>

        </el-header>
        <el-main>
          <router-view name="usercontent" :key="componentKey"></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import UserAside from '@/components/user/UserAside.vue'
import bus from '@/views/user/EventBus'
export default {
  name: 'User',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      user: {},
      componentKey: 1,
      role: 'ROLE_ADMIN'
    }
  },
  components: {
    UserAside
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push('/home/users/home')
      } else if (key === '2') {
        this.$router.push('/home/users/add')
      } else if (key === '3') {
        this.$router.push('/home/users/check')
      } else if (key === '4') {
        this.$router.push('/home/users/cart')
      } else if (key === '5') {
        this.$router.push('/home/users/mycomment')
      } else if (key === '6') {
        this.$router.push('/home/users/userfollow')
      } else if (key === '7') {
        this.$router.push('/home/users/userchat')
      }
      console.log(key, keyPath)
    }
  },
  created () {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    console.log(this.user)
  },
  mounted () {
    bus.$on('unpdata', val => {
      this.componentKey = this.componentKey + val
    })
  }
}
</script>

<style lang="less" scoped>
.user-container {
  height: 100vh;
}
</style>
