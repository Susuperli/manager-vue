const express = require('express')

const {
  sleep,
  getToken,
  writeToken,
  getUserInfo,
  getPassword,
  createUserInfo
} = require('../utils')
const { COOKIE_TIME, NICKNAME, ACCESS_TOKEN, USER_ID } = require('../constance')

const router = express.Router()

// 登录
router.post('/login', async (req, res, next) => {
  // 获取登录信息
  const { username, password } = req.body
  const userInfo = await getUserInfo(username)
  const userPassword = await getPassword(username)

  const result = {
    success: false,
    code: 200,
    msg: '登录失败',
    data: {
      success: false
    }
  }

  // 模拟延迟
  await sleep(1000)

  if (userPassword) {
    if (userPassword === password) {
      const token = await getToken(username)
      // 写入token
      await writeToken(username, token)

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

      console.log(`/login ${username}登录成功`)

      result.msg = '登录成功'
      result.data.success = true
      result.success = true
      result.data.access_token = token
    } else {
      result.msg = '账号或者密码错误，请重新输入'
    }
  } else {
    result.data.success = false
    result.success = false
    result.msg = '用户名不存在'
  }

  res.send(result)
  next()
})

// 注册
router.post('/register', async (req, res, next) => {
  const { username, password, nickname } = req.body
  const userinfo = await getUserInfo(username)

  const result = {
    success: true,
    code: 200,
    msg: '注册成功',
    data: {
      success: true
    }
  }

  if (userinfo) {
    result.msg = '用户名已存在'
    result.data.success = false
    result.success = false
  } else {
    const createResult = createUserInfo({ username, password, nickname })
    if (!createResult) {
      result.msg = '添加失败'
      result.data.success = false
      result.success = false
    }
  }

  res.send(result)
  next()
})

// 退出登录
router.post('/logout', async (req, res, next) => {
  const result = {
    success: true,
    code: 200,
    msg: '退出成功',
    data: {
      success: true
    }
  }

  await sleep(1000)

  // 删除token
  try {
    writeToken(req.cookies[USER_ID], '')
    // 清除cookie
    res.clearCookie(ACCESS_TOKEN)
    res.clearCookie(ACCESS_TOKEN)
    res.clearCookie(NICKNAME)
    res.clearCookie(USER_ID)
  } catch (e) {
    result.msg = '退出失败'
    result.data.success = false
  }

  res.send(result)
  next()
})

module.exports = router
