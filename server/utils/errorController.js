function handleMongooseError(error) {
  console.log(error, 'error')
  if (error.name === 'ValidationError') {
    return 'Validation failed'
  } else if (error.code === 11000) {
    return 'Duplicate key error'
  } else {
    return 'Database operation failed'
  }
}

async function insertDBErrorController(cb) {
  try {
    return await cb()
  } catch (error) {
    console.error('Error creating:', handleMongooseError(error))
    return false
  }
}

module.exports = {
  handleMongooseError,
  insertDBErrorController
}
