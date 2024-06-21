const jsonWebToken = require('jsonwebtoken')
const Token = require('../db/models/Token')

const { TOKEN_KEY } = require('../constance')

function createToken(username) {
  return jsonWebToken.sign(
    {
      data: {
        username: username
      }
    },
    TOKEN_KEY,
    {
      expiresIn: 60 * 24 * 7
    }
  )
}

async function getToken(username) {
  // 如果有就从库里面取，没有就重新生成
  const token = await Token.findOne({ username })
  // 验证cookie是否过期
  if (token && jsonWebToken.decode(token).exp > Date.now()) {
    return token
  }

  // 重新生成token
  return createToken(username)
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

async function writeToken(username, token) {
  return await Token.create({
    username,
    token
  })
}

module.exports = {
  getToken,
  verifyToken,
  writeToken
}
