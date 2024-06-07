const { getFileObject, writeFileObject, ...restFunction } = require('./fileRelate')
const { sleep, sleepSync } = require('./sleep')
const { getToken, verifyToken } = require('./token')
const { getPassword, getUserInfo } = require('./user')

module.exports = {
  getFileObject,
  writeFileObject,
  sleep,
  sleepSync,
  getToken,
  verifyToken,
  getPassword,
  getUserInfo,
  ...restFunction
}
