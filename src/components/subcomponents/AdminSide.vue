<template>
  <div class="www">
    <el-row class="tac">
      <el-col :span="12">

        <el-menu >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><router-link to="/Administrator/users">用户管理</router-link></el-menu-item>

            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><router-link to="/Administrator/sensitive">敏感评论</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link to="/Administrator/articles">文章审核</router-link></el-menu-item>
               <el-menu-item index="2-3"><router-link to="/Administrator/articleLists">文章管理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>销售管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><router-link to="/Administrator/ground">图书上架</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to="/Administrator/orders">订单管理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>在线交流</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><router-link to="/Administrator/chat">联系用户</router-link></el-menu-item>

            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'AdminSide'
}
</script>

<style lang="less" scoped>
.www {
  width: 100%;
background-color: antiquewhite;
}
.tac{
width: 100%;
}
.el-menu{
  min-width: 198px;
  flex: 1;
}

.el-scrollbar{
  .page-scroll {

    height: 100%;

  }
  .page-scroll .el-scrollbar__wrap {

    overflow-x: hidden;

  }
}

</style>
