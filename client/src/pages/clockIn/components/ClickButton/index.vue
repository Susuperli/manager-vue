<template>
  <div class="button-container">
    <el-button
      @click="buttonClick"
      :loading="isFetching"
      v-if="isToday(clickDate)"
      size="large"
      type="primary"
      >打卡</el-button
    >
    <el-button type="primary" size="large" v-else @click="modifyClick">修改时间</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'

import { usePost } from '@/request'

const { init, clickDate } = defineProps(['init', 'clickDate'])
const isFetching = ref(false)

const isToday = (date) => date.isToday()

const buttonClick = useDebounceFn(
  async () => {
    // 发送接口
    isFetching.value = true
    await usePost('/clockIn/do')
    isFetching.value = false

    await init()
  },
  500,
  { maxWait: 1000 }
)
const modifyClick = () => {
  ElMessage({
    type: 'warning',
    message: '努力开发中，如有问题请先联系开发人员',
    duration: 2000
  })
}
</script>

<style scoped>
.button-container {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .button {
    width: 200px;
    height: 200px;
    border-radius: 100px;

    background-color: aqua;
    text-align: center;
    line-height: 200px;
    color: #000;
    font-size: 20px;

    cursor: pointer;
  }
}
</style>
