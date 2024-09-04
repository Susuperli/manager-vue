const mongoose = require('../index')

const ClockInSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false
    },
    start: {
      type: String,
      require: true
    },
    end: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    date: {
      type: String,
      require: true
    },
    month: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

const ClockInModule = mongoose.model('ClockIn', ClockInSchema, 'clockIn')
module.exports = ClockInModule
