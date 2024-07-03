const express = require('express')
const OpenAI = require('openai')

const { getResponseInstance } = require('../utils')
const {
  getChattingHistory,
  createChattingHistory,
  getChattingHistoryWithSystemInstance
} = require('../services')
const { OPEN_AI_API_KEY, ROLE, DEFAULT_BOT_AVATAR, USER_ID } = require('../constance')

const router = express.Router()

const client = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1'
})

router.get('/moonshot/getHistory', async (req, res, next) => {
  const { pageNo, pageSize } = req.query

  const result = getResponseInstance()
  const userId = req.cookies?.[USER_ID]

  const historyRes = await getChattingHistory(userId, pageNo, pageSize)

  if (historyRes) {
    result.data = historyRes
  } else {
    result.success = false
    result.msg = '获取聊天记录失败'
  }

  res.send(result)
  next()
})

router.post('/moonshot', async (req, res, next) => {
  const { message } = req.body
  const userId = req.cookies?.[USER_ID]
  const result = getResponseInstance()

  const messageInstance = getChattingHistoryWithSystemInstance(
    userId,
    message.role,
    message.content
  )
  await createChattingHistory(messageInstance)

  try {
    const messages = await getChattingHistory(userId, 1, 3)

    const completion = await client.chat.completions.create({
      model: 'moonshot-v1-8k',
      temperature: 0.3,
      // 为保证对话正常，只会保存最近三次结果
      messages: messages.history.map((item) => {
        return {
          role: item.role,
          content: item.content
        }
      })
    })

    /**
     * @todo 1. 错误处理；2.流式调用
     */
    const content = completion.choices[0].message.content

    const messageInstance = getChattingHistoryWithSystemInstance(userId, ROLE.SYSTEM, content)
    await createChattingHistory(messageInstance)

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
