<template>
  <div class="app-container">
    <el-config-provider :locale="props.locale">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { ElConfigProvider } from 'element-plus'
import duration from 'dayjs/plugin/duration'
import isToday from 'dayjs/plugin/isToday'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 导入 duration 插件来处理时间差
dayjs.extend(duration)
// 导入 isToday 来判断是否是今天
dayjs.extend(isToday)

const props = defineProps({ locale: zhCn })
</script>

<style scoped>
.app-container {
  /* padding: 20px; */
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
