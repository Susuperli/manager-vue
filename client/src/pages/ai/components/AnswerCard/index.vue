<template>
  <div class="answer-card-container">
    <ChattingRecordsCard :chattingRecords="chattingRecords" />
    <ChattingInput
      :needVoice="false"
      v-model="chattingInput"
      :submit="submit"
      :loading="submitLoading"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { ChattingRecordsCard, ChattingInput } from '@/components'
import { sleep } from '@/utils'

import { DEFAULT_USER_AVATAR, DEFAULT_BOT_AVATAR } from './../../constance'
import { ROLE } from '@/constance'

const chattingRecords = ref([
  {
    role: ROLE.BOT,
    content: '您好，哪里可以帮助您呢',
    time: 1718260363,
    index: 0,
    avatar: DEFAULT_BOT_AVATAR
  },
  { role: ROLE.USER, content: '你好', time: 1718260363, avatar: DEFAULT_USER_AVATAR },
  {
    role: ROLE.BOT,
    content: '你也好',
    time: 1718260363,
    index: 0,
    avatar: DEFAULT_BOT_AVATAR
  }
])
const chattingInput = ref('')
const submitLoading = ref(false)

const submit = async (chattingContent) => {
  const { type, content } = chattingContent
  submitLoading.value = true
  chattingInput.value = ''
  chattingRecords.value.push({
    role: ROLE.USER,
    content,
    time: 1718260363,
    avatar: DEFAULT_USER_AVATAR
  })
  await sleep(1000)
  chattingRecords.value.push({
    role: ROLE.BOT,
    content: '是的',
    time: 1718260363,
    avatar: DEFAULT_BOT_AVATAR
  })
  submitLoading.value = false
  console.log(type, content, chattingInput.value, 'arg')
}
</script>

<style scoped>
.answer-card-container {
  width: 500px;
  /* height: 500px; */
  overflow-y: scroll;
  border-radius: 5px;

  background-color: rgba(0, 0, 0, 0.1);
}
</style>
