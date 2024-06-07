const { fileRelate } = require('./fileRelate')

function getPassword(username) {
  const loginMap = fileRelate.getFileContent('login.json')
  const userPassword = loginMap?.[username]?.password
  return userPassword
}
function getUserInfo(username) {
  const loginMap = fileRelate.getFileContent('login.json')
  const userInfo = loginMap?.[username]
  return userInfo
}

module.exports = { getPassword, getUserInfo }
