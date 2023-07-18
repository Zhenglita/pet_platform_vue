<template>
  <div style="margin-left:60px;">
    <el-tabs type="border-card" class="box-card" style="float: left;margin-top:20px">
      <el-tab-pane label="文章分类">
        <div>
         <el-button type="text" @click="handleCommand('')">所有文章</el-button>
        </div>
        <div>
         <el-button type="text" @click="handleCommand('哺乳类')">哺乳类</el-button>
        </div>
        <div>
         <el-button type="text" @click="handleCommand('鸟类')">鸟类</el-button>
        </div>
        <div>
         <el-button type="text" @click="handleCommand('爬行类')">爬行类</el-button>
        </div>
        <div>
         <el-button type="text" @click="handleCommand('鱼类')">鱼类</el-button>
        </div>
        <div>
         <el-button type="text" @click="handleCommand('昆虫类')">昆虫类</el-button>
        </div>
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import bus from '@/components/home/EventBus'
export default {
  name: 'HomeAsideLeft',
  data () {
    return {

    }
  },
  methods: {
    handleCommand (command) {
      bus.$emit('type', command)
    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 99%;
}
.el-tabs {
  float: left;
}
.text{
display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 1;
 overflow: hidden;
 text-align:justify;
text-justify:inter-ideograph;

}
/deep/.el-tabs{
.el-tabs__item{
font-size:16px;
}
}
</style>
