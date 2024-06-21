const User = require('../db/models/User')

async function getUserInfo(username) {
  return await User.findOne({ username })
}

async function createUserInfo(userInfo) {
  await User.create(userInfo)
}

async function getPassword(username) {
  const userInfo = await getUserInfo(username)
  return userInfo?.password
}

module.exports = { getPassword, getUserInfo, createUserInfo }
