const jsonWebToken = require('jsonwebtoken')

const { fileRelate } = require('./fileRelate')
const { TOKEN_KEY } = require('../constance')

const tokenMap = fileRelate.getFileContent('token.json')

function getToken(username) {
  // 如果有就从map里面取，没有就重新生成
  const token = tokenMap[username]
  // 验证cookie是否过期
  if (token && jsonWebToken.decode(token).exp > Date.now()) {
    return token
  }
  if (token) {
    return token
  }

  return jsonWebToken.sign(
    {
      data: {
        username: username
      }
    },
    TOKEN_KEY,
    {
      expiresIn: 60
    }
  )
}

function verifyToken(token) {
  if (!token) {
    return false
  }

  let result = false

  try {
    result = jsonWebToken.verify(token, TOKEN_KEY)
  } catch (e) {
    return false
  }

  return result
}

function tokenInfo() {
  return jsonWebToken.decode(token)
}

module.exports = {
  getToken,
  verifyToken
}
