const ChattingHistory = require('../db/models/ChattingHistory')

const { ROLE } = require('../constance')
const { handleMongooseError } = require('../utils/errorController')

const createChattingHistory = async (data) => {
  try {
    return (await ChattingHistory.create(data)).save()
  } catch (error) {
    console.error('Error creating:', handleMongooseError(error))

    return false
  }
}

const getChattingHistory = async (send_id, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit
    const history = (
      await ChattingHistory.find({ send_id }).sort({ createdAt: -1 }).skip(skip).limit(limit)
    ).reverse()
    const total = await ChattingHistory.countDocuments({ send_id })

    return {
      history,
      total,
      page
    }
  } catch (error) {
    console.error('Error getting:', handleMongooseError(error))
    return false
  }
}

const getChattingHistoryInstance = (send_id, receive_id, role, message) => {
  return {
    send_id,
    receive_id,
    content: message,
    role
  }
}
const getChattingHistoryWithSystemInstance = (send_id, role, message) =>
  getChattingHistoryInstance(send_id, ROLE.SYSTEM, role, message)

module.exports = {
  createChattingHistory,
  getChattingHistory,
  getChattingHistoryInstance,
  getChattingHistoryWithSystemInstance
}
