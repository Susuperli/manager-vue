<template>
  <el-config-provider :locale="props.locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const props = defineProps({ locale: zhCn })
</script>

<style scoped></style>
