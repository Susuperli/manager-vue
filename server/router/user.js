const express = require('express')

const { sleep, getUserInfo } = require('../utils')
const { USER_ID, DEFAULT_AVATAR } = require('../constance')

const router = express.Router()

router.get('/info', async (req, res, next) => {
  const result = {
    success: true,
    code: 200,
    msg: '获取成功',
    data: {
      username: '用户名',
      nickname: '昵称',
      avatar: DEFAULT_AVATAR
    }
  }

  await sleep(200)

  const userId = req.cookies?.[USER_ID]
  const userInfo = getUserInfo(userId)

  if (userInfo) {
    result.data = {
      username: userInfo.username ?? '',
      nickname: userInfo.nickname ?? '',
      avatar: userInfo.avatar ?? DEFAULT_AVATAR
    }
  }

  res.send(result)
  next()
})

module.exports = router
