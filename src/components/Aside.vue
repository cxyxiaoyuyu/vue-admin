<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    unique-opened
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409eff"
    :default-active="activeMenu"
  >
    <h3 v-show="!isCollapse">通用后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>

    <el-submenu
      :index="item.id + ''"
      v-for="item in hasChildren"
      :key="item.name"
    >
      <template #title>
        <i :class="'el-icon-' + iconsObj[item.id]"></i>
        <span>{{ item.authName }}</span>
      </template>

      <el-menu-item
        v-for="subItem in item.children"
        :key="subItem.id"
        @click="clickMenu(item, subItem)"
        :index="subItem.path"
      >
        <i class="el-icon-menu"></i>{{ subItem.authName }}</el-menu-item
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
  text-align: center;
  color: #fff;
}
</style>

<script>
import { getMenuList } from "@/api/data.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      menuList: [],
      iconsObj: {
        125: "user-solid",
        102: "s-order",
        101: "s-shop",
        103: "lock",
        145: "s-data",
      },
    };
  },
  created() {
    this.getMenu().then(this.setMenu);
  },
  methods: {
    clickMenu(item, subItem) {
      console.log(item, subItem, "xxx");
      this.$router.push({ name: subItem.path });
      this.selectMenu({ parentMenuName: item.authName, menu: subItem });
    },
    setMenu() {
      // 根据当前路由 决定显示的菜单
      let flag = false;
      for (let i = 0; i < this.menuList.length; i++) {
        if (flag) break;
        const parentMenu = this.menuList[i];
        for (let j = 0; j < parentMenu.children.length; j++) {
          const menu = this.menuList[i].children[j];
          if (menu.path === this.$route.name) {
            this.selectMenu({ parentMenuName: parentMenu.authName, menu });
            flag = true;
            break;
          }
        }
      }
    },
    getMenu() {
      return getMenuList().then((res) => {
        this.menuList = res.data;
      });
    },
    ...mapMutations({
      selectMenu: "selectMenu",
    }),
  },
  computed: {
    hasChildren() {
      return this.menuList.filter((item) => item.children);
    },
    noChildren() {
      return this.menuList.filter((item) => !item.children);
    },
    ...mapState({
      isCollapse: (state) => state.tab.isCollapse,
      currentMenu: (state) => state.tab.currentMenu,
    }),
    activeMenu() {
      if (this.currentMenu) {
        return this.currentMenu.path;
      } else {
        return "";
      }
    },
  },
};
</script>
