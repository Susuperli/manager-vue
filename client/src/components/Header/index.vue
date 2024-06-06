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
              <img
                src="https://j1.58cdn.com.cn/jinrong/images/ems1716862417616b06e5a009e748.png"
                alt="头像"
              />
            </div>
            <div class="nickname">1111</div>
          </div>
        </div>
      </template>

      <template #default>
        <div class="exit" @click="logout">退出登录</div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGet } from '@/request'

// 获取用户信息
const { data: userInfo, isFetching: loading } = useGet('/user/info')

// 退出登录
const logout = async () => {
  // await useGet('/logout')
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
