function getResponseInstance(success, code, msg, data) {
  return {
    success: success || true,
    code: code || 200,
    msg: msg || '成功',
    data: data || null
  }
}

module.exports = {
  getResponseInstance
}
