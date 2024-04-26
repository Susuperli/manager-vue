<template>
  <div class="container">
    <div class="login-box">
      <el-form label-width="80px" :model="ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-box">
            <el-button type="primary" @click="login" class="login-btn">登录</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="tips">
            <span class="register btn" @click="register">注册</span>
            <span class="btn">忘记密码</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const ruleForm = reactive({
  username: '',
  password: ''
})

const login = () => {
  // @TODO 登录逻辑
  console.log('ruleForm', ruleForm)
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;

  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    cursor: pointer;
  }
  .btn:hover {
    text-decoration: underline;
  }

  .login-box {
    width: 400px;
    padding: 20px 36px 0 18px;
    border-radius: 18px;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.1);

    .btn-box {
      display: flex;
      width: 100%;

      .login-btn {
        width: 100%;
      }
    }
    .tips {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
