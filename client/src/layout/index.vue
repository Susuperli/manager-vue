<template>
  <el-container class="container">
    <el-aside class="aside">
      <Menu :menuList="[...homeRouter, ...menuRouter]" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <el-footer class="footer">
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { Menu, Header, Footer } from '@/components'

import { homeRouter, menuRouter } from '@/router'
</script>
<style scoped>
.container {
  height: 100vh;

  .aside {
    width: 180px;
    /* background-color: aqua; */
  }

  .header {
    height: 50px;
    background-color: aquamarine;
  }

  .main {
    /* border: 1px solid red; */
  }

  .footer {
    height: 50px;
    background-color: beige;
  }
}
</style>
