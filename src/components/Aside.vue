<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-show="!isCollapse">通用后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>

    <el-menu-item :index="item.name" 
      v-for="item in noChildren" 
      :key="item.name"
      @click="clickMenu(item)">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>


    <el-submenu :index="item.name" v-for="item in hasChildren" :key="item.name">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>

      <el-menu-item-group >
        <el-menu-item v-for="subItem in item.children" :key="subItem.name" 
          @click="clickMenu(subItem)"
          :index="subItem.name">
         <i :class="'el-icon-'+subItem.icon"></i>{{subItem.label}}</el-menu-item>
      </el-menu-item-group>

    </el-submenu>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo {
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-item,.el-submenu{
  text-align: left
}
h3 {
  line-height: 60px;
  color: #fff;
}
</style>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "main",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          name: "other",
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },{
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickMenu(item){
      this.$router.push({name: item.name})
    }
  },
  computed: {
    hasChildren(){
      return this.menu.filter(item => item.children)
    },
    noChildren(){
      return this.menu.filter(item => !item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>
