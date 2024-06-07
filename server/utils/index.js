const { getFileObject, writeFileObject, ...restFunction } = require('./fileRelate')
const { sleep } = require('./sleep')
const { getToken, verifyToken } = require('./token')
const { getPassword, getUserInfo } = require('./user')

module.exports = {
  getFileObject,
  writeFileObject,
  sleep,
  getToken,
  verifyToken,
  getPassword,
  getUserInfo,
  ...restFunction
}
