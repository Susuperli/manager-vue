const express = require('express')
const bodyParser = require('body-parser')

const router = require('./router')

const port = 3030
const app = express()

// 配置解析表单请求体
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
