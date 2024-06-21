const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema(
  { username: { type: String, required: true, unique: true } },
  { timestamps: true }
)

const Token = mongoose.model('Token', tokenSchema, 'token')
module.exports = Token
