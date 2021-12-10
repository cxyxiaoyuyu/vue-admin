<template>
  <div class="tabs">
    <el-tag
      v-for="(tag,index) in tabsList"
      :key="tag.name"
      :closable="tag.path !== 'home'"
      :effect="$route.name === tag.path ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="closeMenu(tag,index)"
      >{{ tag.authName }}</el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  methods: {
    changeMenu(menu){
      this.$router.push({name: menu.path})
    },
    closeMenu(tag,index){
      console.log(this.tabsList,'xx')
      const length = this.tabsList.length - 1

      // 删除vuex中的tabsList
      this.close(tag)


      // 判断是否是最后一个
      // 第一种情况 不是当前路由
      if(tag.path !== this.$route.name){
        return 
      }
      
      // 是当前路由 并且是最后一个tab
      if(index === length){
        // 向左跳转
        this.$router.push({
          name: this.tabsList[index - 1].path
        })
      }else{
        // 向右跳转
        this.$router.push({name: this.tabsList[index].name})
      }
    },
    ...mapMutations({
      close: "closeTag" 
    })
  },
  computed: {
    ...mapState({
      tabsList: (state) => state.tab.tabsList,
    })
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  text-align: left;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>