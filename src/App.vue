<template>
  <RouterView>
    <el-config-provider :locale="props.locale">
      <el-button type="primary">按钮</el-button>
    </el-config-provider>
  </RouterView>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const props = defineProps({ locale: zhCn })
</script>

<style scoped></style>
