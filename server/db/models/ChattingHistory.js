const mongoose = require('../index')

const ChattingHistorySchema = new mongoose.Schema(
  {
    message_id: {
      type: mongoose.SchemaTypes.ObjectId,
      auto: true
    },
    send_id: {
      type: String,
      required: true
    },
    receive_id: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const ChattingHistoryModule = mongoose.model(
  'ChattingHistory',
  ChattingHistorySchema,
  'chattingHistory'
)
module.exports = ChattingHistoryModule
