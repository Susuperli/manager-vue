const jsonWebToken = require('jsonwebtoken')

const Token = require('../db/models/Token')
const { insertDBErrorController } = require('./errorController')

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
  const tokenInfo = await Token.findOne({ username })
  const token = tokenInfo ? tokenInfo.token : null
  // 验证cookie是否过期
  if (verifyToken(token)) {
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

async function insertToken(username, token) {
  return await insertDBErrorController(
    Token.insertMany({
      username,
      token
    })
  )
}
async function updateToken(username, token) {
  const tokenInfo = await Token.findOne({ username })
  console.log(tokenInfo, token)
  return await Token.updateOne(
    { username },
    { $set: { token: token } },
    { upsert: true, new: true }
  )
}

async function writeToken(username, token) {
  return await updateToken(username, token)
}

module.exports = {
  getToken,
  verifyToken,
  writeToken
}
