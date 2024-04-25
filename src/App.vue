<template>
  <RouterView>
    <el-config-provider :locale="locale">
      <el-button type="primary">按钮</el-button>
    </el-config-provider>
  </RouterView>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const props = defineProps({ locale: zhCn })

const locale = ref(props.locale)
</script>

<style scoped></style>
