const express = require('express')

const userRouter = require('./user.js')
const loginRouter = require('./login.js')
const aiRouter = require('./ai.js')
const fileRouter = require('./file.js')
const clockInRouter = require('./clockIn.js')

const router = express.Router()

router.use('/', loginRouter)
router.use('/user', userRouter)
router.use('/ai', aiRouter)
router.use('/file', fileRouter)
router.use('/clockIn', clockInRouter)

module.exports = router
