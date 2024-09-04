<template>
  <div class="header-container">
    <div>
      <!-- 预留位置 -->
    </div>

    <el-popover placement="bottom" trigger="hover" popper-class="header-popover" width="50">
      <template #reference>
        <div>
          <div class="user-info">
            <div class="avatar">
              <img :src="userInfo?.avatar" />
            </div>
            <div class="nickname">{{ userInfo?.nickname ?? '昵称' }}</div>
          </div>
        </div>
      </template>

      <template #default>
        <div class="exit" @click="logout" v-loading.fullscreen.lock="logoutLoading">退出登录</div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePost } from '@/request'

const router = useRouter()
const logoutLoading = ref(false)

const { userInfo } = defineProps({ userInfo: { required: true } })

// 退出登录
const logout = async () => {
  logoutLoading.value = true
  const { data: logoutData } = await usePost('/logout')
  logoutLoading.value = false

  const { success } = logoutData.value

  if (success) {
    ElMessage({
      type: 'success',
      message: '退出成功'
    })
    router.push('/login')
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;

  .user-info {
    display: flex;
    align-items: center;
    height: 100%;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 40px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 40px;
      }
    }

    .nickname {
      margin-left: 10px;
    }
  }
}
</style>
<style>
.el-popover.header-popover {
  width: 50px !important;
  min-width: 100px !important;
  padding: 0 !important;

  .exit {
    text-align: center;
    cursor: pointer;
    padding: 12px;
  }
}
</style>
