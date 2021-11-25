<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <v-aside></v-aside>
      </el-aside>
      <el-container>
        <el-header><v-header></v-header></el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import VAside from '@/components/Aside'
import VHeader from '@/components/Header'
export default {
  name: "Home",
  components: {
    VAside,
    VHeader
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header{
  background: #333;
}
.el-main {
  padding-top: 0;
  height: calc(100vh - 60px);
}
</style>