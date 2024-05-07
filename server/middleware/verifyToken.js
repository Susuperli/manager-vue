const { verifyToken } = require('./../utils')

const verifyTokenMiddleware = () => {
  return (req, res, next) => {
    if (req.path !== '/login') {
      const token = req.headers.authorization
      const isValid = verifyToken(token ?? '')

      if (!isValid) {
        res.status(401).send({
          code: 401,
          msg: 'token失效，请重新登录',
          data: null
        })
      }
    }

    next()
  }
}

module.exports = verifyTokenMiddleware
