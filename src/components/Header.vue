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
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="{ path: current.path}">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      // userImg: require("../assets/images/user.png")
    };
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu
    })
  }
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
    color: #666;
    &.is-link {
      color: #fff;
    }
  }
}
</style>