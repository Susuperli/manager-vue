const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('./db')

const router = require('./router')
const { allowedOrigins } = require('./constance')

const verifyTokenMiddleware = require('./middleware/verifyToken')
const timeoutMiddleware = require('./middleware/timeout')

const port = 3030
const app = express()

app.use(
  cors({
    origin: (origin, callback) => {
      // 检查请求的域名是否在允许的域名列表中
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true // 允许携带凭据（cookie）
  })
)

// 配置解析表单请求体
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 配置解析cookie
app.use(cookieParser())

// 验证token
app.use(verifyTokenMiddleware())

// 路由请求超时的中间件
app.use(timeoutMiddleware())

// 路由
app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
