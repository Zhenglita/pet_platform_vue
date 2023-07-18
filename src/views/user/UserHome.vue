<template> <div style="width: 100%;">  <ArticleInfo
      v-for="item in artlist"
      :key="item.aid"
      :id="item.aid"
      :username="user.username"
      :title="item.title"
      :author="item.author"
      :comm_count="item.comment"
      :pubdate="item.date"
      :image="item.image"
      :message="item.message"
       @change="costPlannedAmountChange($event)"
    ></ArticleInfo></div>
</template>

<script>
import ArticleInfo from '@/components/article/ArticleInfo.vue'

// import { getArticleByUserIdListAPI } from '@/api/articleAPI'
import { getArticleByAdbleListAPI, deteleArticleAPI } from '@/api/articleAPI'
export default {
  name: 'UserHome',
  data () {
    return {
      artlist: [],
      admin: 'admin',
      user: {},
      uid: 1
    }
  },
  methods: {
    async costPlannedAmountChange (val) {
      const { data } = await deteleArticleAPI(val)
      console.log(data)
      this.getAll()
    },
    async getAll () {
      const { data } = await getArticleByAdbleListAPI(true, parseInt(this.user.uid))
      this.artlist = data.data
      console.log(this.artlist)
    }
  },
  created () {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    console.log(this.user.sex)
    this.getAll()
  },
  mounted () {

  },
  components: {
    ArticleInfo
  }
}
</script>

<style>

</style>
