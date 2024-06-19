<template>
  <div class="answer-card-container">
    <ChattingRecordsCard :chattingRecords="chattingRecords" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { ChattingRecordsCard } from '@/components'

import { DEFAULT_USER_AVATAR, DEFAULT_BOT_AVATAR } from './../../constance'
import { SOURCE } from '@/constance'

const chattingRecords = ref([
  {
    source: SOURCE.BOT,
    content: '您好，哪里可以帮助您呢',
    time: 1718260363,
    index: 0,
    avatar: DEFAULT_BOT_AVATAR
  },
  { source: SOURCE.USER, content: '你好', time: 1718260363, avatar: DEFAULT_USER_AVATAR }
])
</script>

<style scoped>
.answer-card-container {
  width: 500px;
  height: 500px;
  overflow-y: scroll;
  border-radius: 5px;

  background-color: rgba(0, 0, 0, 0.1);
}
</style>
