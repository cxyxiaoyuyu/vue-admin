<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img class="img" src="../../assets/images/user.png" alt="" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>

        <div class="loginInfo">
          <p>上次登录时间: <span>2021-10-11</span></p>
          <p>上次登录地点: <span>杭州</span></p>
        </div>
      </el-card>

      <el-card class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="220px">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <el-card shadow="hover">

      </el-card>
    </el-col>


  </el-row>
</template>

<script>
export default {
  data() {
    return { 
      tableData: []
    };
  },
  methods: {
    getTableData(){
      
    }
  },
  mounted(){
    this.getTableData()
  }
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
  .img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin-right: 30px;
  }
}
.loginInfo {
  padding-top: 20px;
  font-size: 15px;
  color: #a7a7a7;
  text-align: left;
  span {
    padding-left: 100px;
  }
}
.table {
  margin-top: 20px;
}
</style>