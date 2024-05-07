<template>
  <div class="app-container">
    <el-config-provider :locale="props.locale">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const props = defineProps({ locale: zhCn })
</script>

<style scoped>
.app-container {
  padding: 20px;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
