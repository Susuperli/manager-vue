<template>
  <div class="ai-container">
    <AnswerCard />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import OpenAI from 'openai'

import AnswerCard from './components/AnswerCard/index.vue'

import { OPEN_AI_API_KEY } from './constance.js'

const text = ref('')

// openai
const client = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1',
  // 后面自己写一个接口，这部分用node做中转
  dangerouslyAllowBrowser: true
})

const init = async () => {
  const completion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Hello!' }],
    model: 'moonshot-v1-8k',
    temperature: 0.3
  })

  console.log(completion.choices[0].message.content)
}

// init()
</script>

<style scoped>
.ai-container {
  height: 100%;
  width: 100%;

  background-color: #fff;
  border-radius: 5px;
}
</style>
