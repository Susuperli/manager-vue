const express = require('express')
const { getResponseInstance } = require('../utils/responseInstance')
const axios = require('axios')

const router = express.Router()

router.post('/upload', (req, res, next) => {
  const result = getResponseInstance()

  res.send(result)
  next()
})

router.get('/upload', (req, res, next) => {
  const result = {
    code: 0,
    msg: 'success',
    data: null
  }

  res.send(result)
  next()
})

module.exports = router
