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
import { usePost } from '@/request'

import { DEFAULT_USER_AVATAR, DEFAULT_BOT_AVATAR } from './../../constance'
import { ROLE } from '@/constance'

const chattingRecords = ref([])
const chattingInput = ref('')
const submitLoading = ref(false)

const getAiResponse = async (message) => {
  const { data: refData } = await usePost('/ai/moonshot', { message })
  console.log(refData.value)

  return refData.value
}

const submit = async (chattingContent) => {
  const { content } = chattingContent

  chattingInput.value = ''

  const questionMessage = {
    role: ROLE.USER,
    content,
    time: 1718260363,
    avatar: DEFAULT_USER_AVATAR
  }
  chattingRecords.value.push(questionMessage)

  submitLoading.value = true
  const responseMessages = await getAiResponse(questionMessage)
  submitLoading.value = false

  chattingRecords.value.push(responseMessages)
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
