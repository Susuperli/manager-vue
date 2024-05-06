const { getFileObject, writeFileObject, ...restFunction } = require('./fileRelate')
const { sleep } = require('./sleep')
const { getToken, verifyToken } = require('./token')

module.exports = {
  getFileObject,
  writeFileObject,
  sleep,
  getToken,
  verifyToken,
  ...restFunction
}
