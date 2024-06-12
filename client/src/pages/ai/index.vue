<template>
  <div>{{ text }}</div>
</template>
<script setup>
import { ref } from 'vue'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

import { OPEN_AI_API_KEY } from './constance.js'

const text = ref('')

const openai = createOpenAI({
  compatibility: 'strict',
  apiKey: OPEN_AI_API_KEY
})
const model = openai('gpt-3.5-turbo')

const init = async () => {
  const result = await generateText({
    prompt: 'Hello, world!',
    model
  })

  const { text } = result
  console.log(result, 'result')

  text.value = text
}

// init()

console.log(text.value, 'text')
</script>
