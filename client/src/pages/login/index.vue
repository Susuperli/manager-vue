<template>
  <div class="container">
    <div class="login-box">
      <el-form
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
        ref="formInstant"
        hide-required-asterisk
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            autocomplete="on"
            name="username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
            show-password
            name="password"
          >
            >
          </el-input>
        </el-form-item>

        <el-form-item label="">
          <el-checkbox v-model="remember">记住密码</el-checkbox>
        </el-form-item>

        <el-form-item>
          <div class="btn-box">
            <el-button
              type="primary"
              @click="login(formInstant)"
              class="login-btn"
              :loading="loading"
              >登录</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <div class="tips">
            <span class="register btn" @click="register">注册</span>
            <span class="btn" @click="forget">忘记密码</span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { usePost } from '@/request'

const formInstant = ref()
const loading = ref(false)
const remember = ref(Boolean(localStorage.getItem('remember')))

const router = useRouter()

const ruleForm = reactive({
  username: localStorage.getItem('username'),
  password: localStorage.getItem('password')
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 20, message: '用户名长度需要在 1 到 20 个字符', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const rememberPassword = () => {
  localStorage.setItem('username', ruleForm.username)
  localStorage.setItem('password', ruleForm.password)
  localStorage.setItem('remember', true)
}
const clearPassword = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('password')
  localStorage.removeItem('remember')
}

const login = async (formInstant) => {
  if (!formInstant) return

  remember.value ? rememberPassword() : clearPassword()

  formInstant.validate(async (valid) => {
    if (valid) {
      loading.value = true
      const { data: refData } = await usePost('/login', ruleForm)
      loading.value = false

      const data = refData.value

      if (data?.success) {
        // 存储token
        localStorage.setItem('access_token', data.access_token)
        ElMessage({
          message: '登录成功',
          type: 'success'
        })

        // 跳转home
        router.push('/home')
      }
    }
  })
}
const register = async () => {
  router.push('/register')
}
const forget = async () => {
  ElMessage({
    message: '暂未开发，请联系开发人员',
    type: 'warning'
  })
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  /* background-image: url('https://j1.58cdn.com.cn/jinrong/images/ems1716862417616b06e5a009e748.png'); */
  /* background-image: url('https://j1.58cdn.com.cn/jinrong/images/ems17252629075030c866b8c44ef3.png'); */
  background-color: #f5f5f5;
  background-size: cover;

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
  .dialog-text {
    text-align: center;
  }

  @media (max-width: 500px) {
    .login-box {
      width: 90%;
    }
  }
}
</style>
