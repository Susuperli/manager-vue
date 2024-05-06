const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const mongoose = require('mongoose')

const { verifyToken } = require('./utils')
const router = require('./router')

const port = 3030
// const mongoDB = 'mongodb://localhost:27017/my_database'
const app = express()

// mongoose.connect(mongoDB)
// mongoose.Promise = global.Promise
// const dp = mongoose.connection

// dp.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors())

// 配置解析表单请求体
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 验证token
app.use(async (req, res, next) => {
  if (req.path !== '/login') {
    const token = req.headers.authorization
    const isValid = verifyToken(token ?? '')

    if (!isValid) {
      res.status(401).send({
        code: 401,
        msg: 'token失效，请重新登录',
        data: null
      })
    }
  }

  next()
})

app.use(async (req, res, next) => {
  if (req.path === '/api/register') {
    res.send({
      code: 200,
      msg: '注册成功',
      data: { success: true }
    })
  }

  next()
})

app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
