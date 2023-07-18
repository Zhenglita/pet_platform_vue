<template>
  <div style="display:flex;">
  <div style="flex:1">
  <h1 v-show="visible" style="font-family:momo;font-size:30px;color:#5f5f5f;margin-top: 50px;margin-left: 120px;" >PET_PLATFORM</h1>
  </div>
  <div class="myheader-container">
    <div class="tabel" >
      <el-menu :default-active="activeIndex" background-color="#f5f5f5" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-if="show===false" index="5" >
          <!-- <router-link to="/home/home"> -->
            退出
          <!-- </router-link> -->
        </el-menu-item>
        <el-menu-item v-else index="6" >
          <!-- <router-link to="/home/home"> -->
            登录
          <!-- </router-link> -->
        </el-menu-item>
        <el-menu-item index="4">
          <!-- <router-link to="/home/users"> -->
            个人中心
          <!-- </router-link> -->
        </el-menu-item>
        <el-menu-item index="3">
          <!-- <router-link to="/home/orders"> -->
            我的订单
          <!-- </router-link> -->
        </el-menu-item>
        <el-menu-item index="2">
          <!-- <router-link to="/home/books"> -->
            图书数据
          <!-- </router-link> -->
        </el-menu-item>
        <el-menu-item index="1" class="home">
          <!-- <router-link to="/home/home"> -->
            首页
          <!-- </router-link> -->
        </el-menu-item>

        <!-- <el-menu-item>
            <h1 v-show="visible" style="font-family:Arial, Helvetica, sans-serif;font-size:30px;color:#5f5f5f;" class="titles" >PET-PLATFORM</h1>
          <el-button type="primary" class="butT"   v-if="show===false"  @click="logout" size="mini" style="margin-top:-1px;">退出</el-button>
        </el-menu-item> -->
         <!-- <el-menu-item index="0" class="home" @click="$router.push('/login')" >
         登录
        </el-menu-item> -->
      </el-menu>
    </div>

    <!-- <div class="tui">
      <button @click="logout">退出登录</button>
    </div> -->
  </div>
  <!-- <div style="flex:1">
             <el-button type="primary" class="butT"   v-if="show===false"  @click="logout" size="mini" style="margin-top:50px;">退出</el-button>
          <el-button type="success" class="butT" v-else  @click="$router.push('/login')" size="mini" style="margin-top:50px;">登录</el-button>
          </div> -->
  </div>
</template>

<script>
import request from '@/utils/request'
import bus from '@/components/home/EventBus'
export default {
  name: 'MyHeader',
  data () {
    return {
      user: {},
      real_user: {},
      show: true,
      timer: '',
      websock: null,
      visible: false,
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  created () {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    const result = JSON.parse(JSON.stringify(this.user))
    console.log(result.uid === undefined)
    if (result.uid !== undefined) {
      this.timer = setInterval(() => {
        this.getSomeMessages()
      }, 1000 * 5)
      this.show = false
    }
  },
  beforeDestroy () {
    // debugger;
    this.clearTimer()
  },

  methods: {
    clearTimer () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    handleCommand (command) {
      bus.$emit('type', command)
      if (this.$route.path !== '/home/home/myhome') {
        this.$router.push('/home/home/myhome')
      }
    },
    async getSomeMessages () {
      if (this.user !== {}) {
        const res = await request.get('/users/change/' + this.user.uid)
        // if (this.real_user.role !== this.user.role) {
        //   sessionStorage.removeItem('user')
        //   sessionStorage.setItem('user', res.data.msg)
        //   this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
        // }
        this.user.role = res.data.msg
        console.log(this.user)
        sessionStorage.setItem('user', JSON.stringify(this.user))
      }

      const { data } = await request.get('/messages/handleReqDefResult')
      if (data === true) {
        this.$message({ type: 'success', message: '您有用户请求沟通消息，请进入消息选择交流' })
      }
    },
    logout () {
      this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
      const username = this.user.username
      const res = request.get('/users/remove/' + username)
      console.log(res)
      // 1.去除token，重新登录
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      this.show = true
      const h = this.$createElement
      this.$notify({
        title: '退出成功',
        message: h('i', { style: 'color: teal' }, '期待下一次与你的相遇，亲爱的' + username + '用户'),
        offset: 100
      })
      // 2.跳转login
      this.$router.push('/')
    },
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push('/home/home')
      } else if (key === '2') {
        this.$router.push('/home/books')
      } else if (key === '3') {
        this.$router.push('/home/orders')
      } else if (key === '4') {
        this.$router.push('/home/users')
      } else if (key === '5') {
        this.logout()
      } else if (key === '6') {
        this.$router.push('/login')
      }
      console.log(key, keyPath)
    }
  },
  mounted () {
    this.visible = !this.visible
  }
}
</script>

<style lang="less" scoped>
.titles{
  margin-right: 1027px;
  font-family: 'momo';
}
.myheader-container {
  padding-top: 30px;
  text-align: center;
  flex: 14;
  margin-right: 30px;
}
.table {
  width: 100%;
  line-height: 100%;
}
.tui {
  padding-left: 140px;
}
.butT {
  // margin-top: 15px;
  margin-left: 25px;
}
.el-menu--horizontal > .el-menu-item {
  float: right;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
.el-menu{

        border:0!important;

}
.titles{
  display: inline;
}
.el-menu--horizontal{
  background-color: #f5f5f5;
}
</style>
