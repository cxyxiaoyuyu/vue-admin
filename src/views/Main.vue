<template>
  <div class="main">
    <el-container>
      <el-aside width="auto">
        <v-aside></v-aside>
      </el-aside>
      <el-container>
        <el-header><v-header></v-header></el-header>
        <v-tag></v-tag>
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
import VTag from '@/components/Tag'
export default {
  name: "Main",
  components: {
    VAside,
    VHeader,
    VTag
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