const express = require('express')

const { sleep, getToken, writeToken, fileRelate, getUserInfo, getPassword } = require('../utils')
const { COOKIE_TIME, NICKNAME, ACCESS_TOKEN, USER_ID } = require('../constance')

const router = express.Router()

// 登录
router.post('/login', async (req, res, next) => {
  // 获取登录信息
  const { username, password } = req.body
  const userPassword = getPassword(username)
  const userInfo = getUserInfo(username)

  const result = {
    success: true,
    code: 200,
    msg: '登录失败',
    data: {
      success: false
    }
  }

  // 模拟延迟
  await sleep(2000)

  if (userPassword) {
    if (userPassword === password) {
      const token = getToken(username)
      // 写入token
      writeToken(username, token)

      // 设置cookie
      res.cookie(ACCESS_TOKEN, token, {
        maxAge: COOKIE_TIME,
        httpOnly: true
      })
      res.cookie(NICKNAME, userInfo.nickname, {
        maxAge: COOKIE_TIME
      })
      res.cookie(USER_ID, userInfo.username, {
        maxAge: COOKIE_TIME,
        httpOnly: true
      })

      result.msg = '登录成功'
      result.data.success = true
      result.data.access_token = token
    } else {
      result.msg = '账号或者密码错误，请重新输入'
    }
  } else {
    result.data.success = false
  }

  res.send(result)

  next()
})

// 注册
router.post('/register', async (req, res, next) => {
  const { username, password, nickname } = req.body
  const userinfo = getUserInfo(username)

  const result = {
    success: true,
    code: 200,
    msg: '注册成功',
    data: {
      success: true
    }
  }

  await sleep(1000)

  if (userinfo) {
    result.msg = '用户名已存在'
    result.data.success = false
  } else {
    fileRelate.writeFileContentAsync('login.json', {
      ...loginMap,
      [username]: {
        username,
        password,
        nickname
      }
    })
  }

  res.send(result)

  next()
})

module.exports = router
