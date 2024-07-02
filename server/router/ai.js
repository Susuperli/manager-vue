const express = require('express')
const OpenAI = require('openai')

const { getResponseInstance } = require('../utils')
const { OPEN_AI_API_KEY, ROLE, DEFAULT_BOT_AVATAR, DEFAULT_USER_AVATAR } = require('../constance')

const router = express.Router()

const client = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1'
})

/**
 * 暂时保存在内存中
 * @todo 持久化
 */
const messages = []

router.post('/moonshot', async (req, res, next) => {
  const { message } = req.body
  messages.push(message)
  const result = getResponseInstance()

  try {
    const completion = await client.chat.completions.create({
      model: 'moonshot-v1-8k',
      temperature: 0.3,
      // 为保证对话正常，只会保存最近三次结果
      messages: messages.slice(-3)
    })

    /**
     * @todo 1. 错误处理；2.流式调用
     */
    const content = completion.choices[0].message.content

    result.data = {
      role: ROLE.SYSTEM,
      content: content,
      time: Date.now(),
      avatar: DEFAULT_BOT_AVATAR
    }
  } catch (err) {
    result.success = false
    result.msg = err.message
    result.data = {
      role: ROLE.SYSTEM,
      content: err.message,
      time: Date.now(),
      avatar: DEFAULT_BOT_AVATAR
    }
  }

  res.send(result)
  next()
})

module.exports = router
