const express = require('express')

const userRouter = require('./user.js')
const loginRouter = require('./login.js')
const aiRouter = require('./ai.js')

const router = express.Router()

router.use('/', loginRouter)
router.use('/user', userRouter)
router.use('/ai', aiRouter)

module.exports = router
