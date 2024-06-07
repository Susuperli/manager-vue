const express = require('express')

const userRouter = require('./user.js')
const loginRouter = require('./login.js')

const router = express.Router()

router.use('/', loginRouter)
router.use('/user', userRouter)

module.exports = router
