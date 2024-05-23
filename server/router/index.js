const express = require('express')

const { sleep, getToken, writeToken, fileRelate } = require('../utils')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

// 登录
router.post('/login', async (req, res) => {
  // 获取登录信息
  const { username, password } = req.body
  const loginMap = fileRelate.getFileContent('login.json')
  const userPassword = loginMap?.[username]?.password

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
      result.msg = '登录成功'
      result.data.success = true

      const token = getToken(username)
      //   设置一些cookie
      result.data.access_token = token
      // 写入token
      writeToken(username, token)
    } else {
      result.msg = '账号或者密码错误，请重新输入'
    }
  } else {
    result.data.success = false
  }

  res.send(result)
})

// 注册
router.post('/register', async (req, res) => {
  const { username, password, nickname } = req.body
  const loginMap = fileRelate.getFileContent('login.json')
  const user = loginMap?.[username]

  const result = {
    success: true,
    code: 200,
    msg: '注册成功',
    data: {
      success: true
    }
  }

  if (user) {
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

  await sleep(1000)

  res.send(result)
})

module.exports = router
