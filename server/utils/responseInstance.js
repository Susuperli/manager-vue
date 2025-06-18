const { omit } = require('radash')

function getResponseInstance(success, code, msg, data) {
  return {
    success: success || true,
    code: code || 200,
    msg: msg || '成功',
    data: data || null
  }
}

function handleDataFromDb(data, ...rest) {
  return omit(data, ['_id', 'createdAt', 'updatedAt', '__v', ...rest])
}

module.exports = {
  getResponseInstance,
  handleDataFromDb
}
