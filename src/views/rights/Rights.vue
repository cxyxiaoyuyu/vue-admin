<template>
  <el-card>
    <el-table :data="rightsList" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="权限名称" prop="authNam"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级" prop="level">
        <template v-slot:default="{ row }">
          <el-tag v-if="row.level === '0'">一级权限</el-tag>
          <el-tag v-if="row.level === '1'" ype="success">二级权限</el-tag>
          <el-tag v-if="row.level === '2'" type="warning">三级权限</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getRightsList } from '@/api/data.js'
export default {
  data(){
    return {
      rightsList: []
    }
  },
  created(){
    this.getRightsList()
  },
  methods: {
    getRightsList(){
      getRightsList().then(res => {
        if(res.meta.status !== 200){
          this.$message.error('获取权限列表失败')
        }else{
          this.rightsList = res.data
          console.log(this.rightsList)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>