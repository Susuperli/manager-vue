<template>
  <RouterView>
    <el-config-provider :locale="locale">
      <el-button type="primary">按钮</el-button>
    </el-config-provider>
  </RouterView>
</template>

<script setup>
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const locale = ref(zhCn)
</script>

<style scoped></style>
