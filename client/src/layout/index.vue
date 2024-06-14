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
      <!-- <el-footer class="footer">
        <Footer />
      </el-footer> -->
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
  background-color: #eee;
  padding-right: 10px;

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
    /* border: 1px solid red; */
    padding: 0;
    padding-top: 10px;
    border-radius: 5px;
  }

  .footer {
    height: 50px;
    background-color: beige;
  }
}
</style>
