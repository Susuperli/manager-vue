<template>
  <div class="register-container">
    <div class="register-box">
      <el-form
        label-width="80px"
        :model="registerForm"
        :rules="rules"
        ref="formInstant"
        label-position="top"
      >
        <div class="title">账号注册</div>

        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="registerForm.nickname"
            placeholder="请输入昵称"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            type="password"
            show-password
            name="password"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="ensurePassword">
          <el-input
            v-model="registerForm.ensurePassword"
            placeholder="请输入密码"
            type="password"
            show-password
            name="ensurePassword"
          >
          </el-input>
        </el-form-item>

        <div class="btn-box">
          <el-button
            type="primary"
            @click="register(formInstant)"
            class="login-btn"
            :loading="loading"
            >注册</el-button
          >
        </div>

        <div class="desc">
          注册即表示您同意并愿意遵守
          <el-link type="primary" @click="protocolClick">用户协议</el-link>
          与 <el-link type="primary" @click="protocolClick">隐私政策</el-link>
        </div>

        <div class="desc control-margin">
          已有账号，立即
          <el-link type="primary" @click="goToLogin">登录</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { usePost } from '@/request'

const formInstant = ref(null)

const router = useRouter()

const registerForm = reactive({
  username: '',
  password: '',
  nickname: '',
  ensurePassword: ''
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 10, message: '用户名长度需要在 3 到 10 个字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称' },
    { min: 2, max: 10, message: '昵称长度需要在 2 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 12, message: '密码长度需要在 6 到 12 个字符', trigger: 'blur' }
  ],
  ensurePassword: [
    {
      required: true,
      message: '请确认输入密码',
      trigger: 'blur'
    },
    {
      validator: (_, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const register = (instant) => {
  instant.validate(async (valid) => {
    if (valid) {
      const res = await usePost('/register', {
        username: registerForm.username,
        password: registerForm.password,
        nickname: registerForm.nickname
      })

      const { data, success, msg } = res.data.value

      if (success && data.success) {
        ElMessage({
          type: 'success',
          message: '注册成功'
        })
        goToLogin()
      } else {
        ElMessage({
          type: 'error',
          message: msg
        })
      }
    }
  })
}

const protocolClick = () => {
  ElMessage({
    message: '不是哥们，还真有人看这个啊',
    type: 'warning'
  })
}

const goToLogin = () => router.push('/login')
</script>

<style scoped>
.register-container {
  width: 100%;

  .title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .register-box {
    width: 35%;
    min-width: 350px;
    padding: 20px;
    margin: 50px auto;
    border-radius: 10px;

    background-color: #fff;
  }

  .btn-box {
    text-align: center;
  }

  .desc {
    display: flex;
    gap: 3px;
    margin-top: 20px;

    text-align: center;
    color: #333;
    font-size: 13px;
  }
  .control-margin {
    margin-top: 0px;
  }
}
</style>
