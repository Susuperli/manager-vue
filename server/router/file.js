const express = require('express')
const { getResponseInstance } = require('../utils/responseInstance')

const router = express.Router()

router.post('/upload', (req, res, next) => {
  const result = getResponseInstance()

  console.log(req.file, 'req')

  res.send(result)
  next()
})

module.exports = router
