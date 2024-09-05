const ClockIn = require('../db/models/ClockIn')

const { handleMongooseError } = require('../utils/errorController')

const createRecord = async (data) => {
  try {
    return (await ClockIn.create(data)).save()
  } catch (error) {
    console.error('Error creating:', handleMongooseError(error))

    return false
  }
}

const getRecord = async (filter) => {
  try {
    // todo
    return await ClockIn.find(filter)
  } catch (error) {
    console.error('Error creating:', handleMongooseError(error))
    return false
  }
}

const updateRecord = async (filter, data) => {
  try {
    return await ClockIn.findOneAndUpdate(filter, data, {
      sort: { start: -1 },
      new: true // 返回更新后的文档
    })
  } catch (error) {
    console.error('Error creating:', handleMongooseError(error))
    return false
  }
}

module.exports = { createRecord, getRecord, updateRecord }
