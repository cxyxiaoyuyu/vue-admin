<template>
  <div class="header">
    <div class="left-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="toggleMenu"
      ></el-button>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="{path: '/home/'+current.path}">{{
          $store.state.tab.currentParentMenu
        }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="{path: '/home/'+current.path}">{{
          current.authName
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" size="mini" @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // userImg: require("../assets/images/user.png")
    };
  },
  methods: {
    toggleMenu() {
      console.log(this.$store)
      this.$store.commit("toggleMenu");
    },
    handleCommand(command) {
      this[command]();
    },
    logout() {
      this.$router.push({ name: "login" });
      sessionStorage.clear();
      this.$message("已退出登录");
    },
  },
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
  },
};
</script>


<style lang="scss" scoped>
.header {
  display: flex;
  line-height: 60px;
  align-items: center;
  justify-content: space-between;
  .left-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .right-content .user {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    vertical-align: middle; // 去除下方间隙 居中对齐
  }
}
.el-breadcrumb__item {
  /deep/ .el-breadcrumb__inner {
    color: #fff;
    cursor: pointer !important;
    
  }
  &:last-child {
     /deep/ .el-breadcrumb__inner {
        color: #fff;
        cursor: pointer !important;
      } 
  }
}
</style>