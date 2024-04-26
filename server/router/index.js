const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', (req, res) => {
  // 获取登录信息
  const { username, password } = req.body
  console.log(username, password)

  const result = {
    success: true,
    code: 200,
    msg: '登录成功',
    data: {
      success: true
    }
  }

  res.send(result)
})

module.exports = router
