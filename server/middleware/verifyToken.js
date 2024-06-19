const { verifyToken } = require('./../utils')
const { jumpTokenList, USER_ID } = require('./../constance')

const verifyTokenMiddleware = () => {
  return (req, res, next) => {
    const token = req.headers.authorization

    const isValid = verifyToken(token ?? '')
    const userId = req.cookies?.[USER_ID]

    if (!jumpTokenList.includes(req.path) && (!isValid || !userId)) {
      res.status(401).send({
        code: 401,
        msg: 'token失效，请重新登录',
        data: null,
        success: false
      })
    } else {
      next()
    }
  }
}

module.exports = verifyTokenMiddleware
