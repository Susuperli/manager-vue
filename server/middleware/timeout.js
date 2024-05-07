const timeoutMiddleware = () => (req, res, next) => {
  res.setTimeout(12 * 1000, function () {
    return res.status(408).send('请求超时')
  })
  next()
}

module.exports = timeoutMiddleware
