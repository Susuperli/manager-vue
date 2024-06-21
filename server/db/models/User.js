const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 6
        },
        message: 'Password must be at least 6 characters long'
      }
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema, 'user')
module.exports = User
