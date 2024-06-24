const User = require('../db/models/User')

const { insertDBErrorController, handleMongooseError } = require('./errorController')

async function getUserInfo(username) {
  return await User.findOne({ username })
}

async function createUserInfo(userInfo) {
  try {
    return await User.create(userInfo)
  } catch (error) {
    console.error('Error creating:', handleMongooseError(error))
    return false
  }
}

async function updateUserInfo(username, userInfo) {
  await User.updateOne({ username }, userInfo)
}
async function updateManyUserInfo(username, userInfo) {
  await User.updateMany({ username }, userInfo)
}
async function deleteUserInfo(username) {
  await User.deleteOne({ username })
}
async function deleteManyUserInfo(username) {
  await User.deleteMany({ username })
}

async function getPassword(username) {
  const userInfo = await getUserInfo(username)
  return userInfo?.password
}

module.exports = {
  getPassword,
  getUserInfo,
  createUserInfo,
  updateUserInfo,
  updateManyUserInfo,
  deleteUserInfo,
  deleteManyUserInfo
}
