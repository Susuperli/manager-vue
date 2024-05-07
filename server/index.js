const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const mongoose = require('mongoose')

const router = require('./router')

const verifyTokenMiddleware = require('./middleware/verifyToken')
const timeoutMiddleware = require('./middleware/timeout')

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
app.use(verifyTokenMiddleware())

// 路由请求超时的中间件
app.use(timeoutMiddleware())

app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
