<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    unique-opened
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409eff"
    router
  >
    <h3 v-show="!isCollapse">通用后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>

    <!-- <el-menu-item
      index="home"
      @click="clickMenu({authName: '首页',})"
    >
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item> -->

    <el-submenu :index="item.id+''" v-for="item in hasChildren" :key="item.name">
      <template slot="title">
        <i :class="'el-icon-'+iconsObj[item.id]"></i>
        <span slot="title">{{ item.authName }}</span>
      </template>

      <el-menu-item
        v-for="subItem in item.children"
        :key="subItem.id"
        @click="clickMenu(subItem)"
        :index="subItem.path+''"
      >
        <i class="el-icon-menu"></i
        >{{ subItem.authName }}</el-menu-item
      >
    </el-submenu>

    
  </el-menu>
</template>

<style>
.el-menu-vertical-demo {
  height: 100vh;
  border-right: 1px solid rgb(84, 92, 100) !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-item,
.el-submenu {
  text-align: left;
}
h3 {
  line-height: 60px;
  color: #fff;
}
</style>

<script>
import { getMenuList } from "@/api/data.js";
export default {
  data() {
    return {
      menuList: [],
      iconsObj: {
        125: 'user-solid',
        102: 's-order',
        101: 's-shop',
        103: 'lock',
        145: 's-data'
      }
    };
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    clickMenu(item) {
      // this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
    getMenu() {
      getMenuList().then((res) => {
        this.menuList = res.data;
      });
    },
  },
  computed: {
    hasChildren() {
      return this.menuList.filter((item) => item.children);
    },
    noChildren() {
      return this.menuList.filter((item) => !item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>
