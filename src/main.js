import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import animate from 'animate.css'
// import 'echarts'
// import ECharts from 'vue-echarts'
import * as echarts from 'echarts'
import VueParticles from 'vue-particles'
import '@/assets/css/font.css'

// Vue.use(animate)
// import '@/assets/css/global.css'
Vue.use(VueParticles)

Vue.prototype.$echarts = echarts

// 全局注册组件（也可以使用局部注册）
// Vue.component('ECharts', ECharts)
Vue.use(ElementUI)

Vue.config.productionTip = false
// Vue.prototype.axios = axios
// $http无所谓，随便叫什么，可以调用this.$http代替axios,
// axios.defaults.baseURL = '请求路径',意思为在axios有一个默认的baseurl，

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
