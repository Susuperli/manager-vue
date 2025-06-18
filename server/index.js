const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')

require('./db')

const router = require('./router')
const { allowedOrigins } = require('./constance')

const verifyTokenMiddleware = require('./middleware/verifyToken')
const timeoutMiddleware = require('./middleware/timeout')

dayjs.extend(duration)

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

// 静态文件托管
app.use(express.static(path.join(__dirname, 'static')))

// 配置解析表单请求体
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 配置解析cookie
app.use(cookieParser())

// 路由请求超时的中间件
app.use(timeoutMiddleware())

// 验证token, 挂载路由
app.use('/api', verifyTokenMiddleware(), router)

// 兜底路由：返回 index.html，让前端路由接管
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
