<template>
  <div class="header">
    <div class="left-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="toggleMenu"></el-button>
      <h3>首页</h3>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" class="user">
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
export default {
  data(){
    return {
      // userImg: require("../assets/images/user.png")
    }
  },
  methods: {
    toggleMenu(){
      this.$store.commit('toggleMenu')
    }
  }
}
</script>


<style lang="scss" scoped>
.header {
  display: flex;
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
  .right-content .user{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    vertical-align: middle;  // 去除下方间隙 居中对齐
  }
}
</style>