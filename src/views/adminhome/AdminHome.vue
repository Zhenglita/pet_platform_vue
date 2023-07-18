<template>
  <div class="all">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->

      <div id="main" style="width: 800px; height: 600px"></div>
    <div id="books" style="width: 800px; height: 600px"></div>

  </div>
</template>

<script>
import request from '@/utils/request'
import { getTopBooksAPI } from '@/api/BooksAPI'
export default {
  name: 'AdminHome',
  data () {
    return {
      titlelist: [],
      commentlist: [],
      booklist: [],
      booktitle: [],
      booknum: []
    }
  },
  created () {
    this.getdata()
    setTimeout(() => {
      this.getEcharts()
    }, 1000)
  },
  methods: {
    getEcharts () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'))
      const myChart2 = this.$echarts.init(document.getElementById('books'))
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '文章热度排行榜'
        },
        tooltip: {},
        legend: {
          data: ['评论人数']
        },
        xAxis: {
          data: this.titlelist,
          axisLabel:
      {
        formatter: function (value) {
          let valueTxt = ''
          if (value.length > 3) {
            valueTxt = value.substring(0, 4) + '...'
          } else {
            valueTxt = value
          }
          return valueTxt
        }
      }
        },
        yAxis: {},
        series: [
          {
            name: '评论人数',
            type: 'bar',
            data: this.commentlist
          }
        ]
      }

      // const option2 = {
      //   title: {
      //     text: '图书销售排行榜'
      //   },
      //   legend: {
      //     top: 'bottom'
      //   },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       mark: { show: true },
      //       dataView: { show: true, readOnly: false },
      //       restore: { show: true },
      //       saveAsImage: { show: true }
      //     }
      //   },
      //   series: [
      //     {
      //       name: 'Nightingale Chart',
      //       type: 'pie',
      //       radius: [50, 250],
      //       center: ['50%', '45%'],
      //       roseType: 'area',
      //       itemStyle: {
      //         borderRadius: 5
      //       },
      //       data: this.booklist
      //     }
      //   ]
      // }
      const option2 = {
        title: {
          text: '图书销售排行榜'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.booktitle
        },
        series: [
          {
            name: '销售量',
            type: 'bar',
            data: this.booknum
          }

        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      myChart2.setOption(option2)
    },

    async getdata () {
      const { data } = await request.get('/articles/home/comment' + '?size=' + 5)
      const res = await getTopBooksAPI()
      console.log(data)
      this.titlelist = data.data.map((v) => v.articlename)
      this.booklist = res.data.data
      this.booktitle = res.data.data.map((v) => v.name)
      this.booknum = res.data.data.map((v) => v.value)
      this.commentlist = data.data.map((v) => v.count)
    }
  }
}
</script>

<style lang="less" scoped>

.all{
  display: flex;
  width: 100%;
}
.books{
  padding-top: 200px;
}
</style>
