const { verifyToken } = require('./../utils')
const { jumpTokenList, USER_ID } = require('./../constance')

const verifyTokenMiddleware = () => {
  return (req, res, next) => {
    if (!jumpTokenList.includes(req.path)) {
      const token = req.headers.authorization
      const isValid = verifyToken(token ?? '')

      const userId = req.cookies?.[USER_ID]

      if (!isValid || !userId) {
        res.status(401).send({
          code: 401,
          msg: 'token失效，请重新登录',
          data: null,
          success: false
        })
      }
    }

    next()
  }
}

module.exports = verifyTokenMiddleware
