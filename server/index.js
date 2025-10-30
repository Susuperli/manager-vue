const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

require('./db')

const router = require('./router')
const { allowedOrigins } = require('./constance')

const verifyTokenMiddleware = require('./middleware/verifyToken')
const timeoutMiddleware = require('./middleware/timeout')

dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)

const port = 3030
const app = express()

// 静态文件服务
app.use(express.static(path.join(__dirname, 'static')))

// CORS（允许跨域）
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)

// 解析请求体（仅用于 API，但必须放在静态文件之后）
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 解析 Cookie
app.use(cookieParser())

// 超时中间件
app.use(timeoutMiddleware())

// API 路由（带 token 验证）
app.use('/api', verifyTokenMiddleware(), router)

// 兜底路由：返回 index.html
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`listening on port ${port}`)
})
