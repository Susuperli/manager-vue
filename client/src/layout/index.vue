<template>
  <el-container class="container">
    <el-aside class="aside">
      <Menu :menuList="[...homeRouter, ...menuRouter]" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header :userInfo="userInfo" />
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <!-- <el-footer class="footer">
        <Footer />
      </el-footer> -->
    </el-container>
  </el-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

import { Menu, Header } from '@/components'
import { homeRouter, menuRouter } from '@/router'
import { useGet } from '@/request'

// 获取用户信息
const { data: userInfo } = useGet('/user/info')

const screenWidth = ref(window.innerWidth)
const screenHeight = ref(window.innerHeight)

const updateScreenSize = () => {
  screenWidth.value = window.innerWidth
  screenHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)

  if (screenWidth.value < 900) {
    console.log(1111)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>
<style scoped>
.container {
  height: 100vh;
  background-color: #eee;

  .aside {
    width: 180px;
    background-color: white;
    margin-right: 10px;
  }

  .header {
    height: 60px;
    background-color: white;
    border-radius: 5px;
  }

  .main {
    padding: 0;
    padding-top: 10px;
    border-radius: 5px;
    padding: 10px;
  }

  .footer {
    height: 50px;
    background-color: beige;
  }
}
</style>
