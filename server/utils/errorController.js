function handleMongooseError(error) {
  if (error.name === 'ValidationError') {
    return 'Validation failed'
  } else if (error.code === 11000) {
    return 'Duplicate key error'
  } else {
    return 'Database operation failed'
  }
}

module.exports = {
  handleMongooseError
}
