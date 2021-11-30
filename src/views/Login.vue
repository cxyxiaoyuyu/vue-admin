<template>
  <div class="login_container">
    <div class="login_wrap">
      <div class="avatar_wrap">
        <img src="../assets/images/user.png" alt="" />
      </div>

      <el-form label-width="80px" :model="loginForm" :rules="loginRules" ref="loginFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>

        <el-form-item class="buttons">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/data.js'
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login(){
      this.$refs.loginFormRef.validate(isValid => {
        if(!isValid) return
        console.log('loginiiiiii')
        login(this.loginForm).then(res => {
          if(res.data){
            this.$message.success('登录成功')
            
            // 将token 保存到sessionStorage中 跳转到home页面
            sessionStorage.setItem('token',res.data.token)
            this.$router.push({name: 'home'})
          }else{
            this.$message.error(res.meta.msg)
          }   
        })
      })
    },


    // 重置表单
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields()
    }
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  background: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_wrap {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #eee;
    padding-right: 20px;
    .avatar_wrap {
      margin: -65px auto;
      padding: 10px;
      width: 120px;
      height: 120px;
      background: #fff;
      box-shadow: 0 0 10px #ddd;
      border-radius: 50%;
      display: flex;
      img {
        background: #eee;
        border-radius: 50%;
        width: 120px;
        height: 120px;
      }
    }
    .el-form {
      margin-top: 85px;
      .buttons {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>