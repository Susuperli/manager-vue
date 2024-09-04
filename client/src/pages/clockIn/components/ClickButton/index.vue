<template>
  <div class="button-container">
    <div class="button" @click="buttonClick">点击</div>
  </div>
</template>

<script setup>
import { useDebounceFn } from '@vueuse/core'

const buttonClick = useDebounceFn(() => {
  // 发送接口
}, 1000)
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

    cursor: pointer;
  }
}
</style>
