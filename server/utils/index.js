const { getFileObject, writeFileObject, ...restFunction } = require('./fileRelate')
const { sleep, sleepSync } = require('./sleep')
const { getToken, verifyToken, writeToken } = require('./token')
const { getPassword, getUserInfo, createUserInfo } = require('./user')

module.exports = {
  getFileObject,
  writeFileObject,
  sleep,
  sleepSync,
  getToken,
  verifyToken,
  getPassword,
  getUserInfo,
  createUserInfo,
  writeToken,
  ...restFunction
}
