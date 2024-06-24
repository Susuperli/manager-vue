const mongoose = require('../index')

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
})

const LoginSchemaModule = mongoose.model('Login', LoginSchema, 'login')
module.exports = LoginSchemaModule

// LoginSchemaModule.aggregate([
//   {
//     $lookup: {
//       from: 'users',
//       localField: 'user_id', // 我的表中的字段
//       foreignField: '_id',
//       as: 'user'
//     }
//   },
//   { $match: { username: 'admin' } },
//   { $project: { user: 1 } }
// ])
