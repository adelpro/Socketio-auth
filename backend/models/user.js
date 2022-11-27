const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
  },
})
module.exports = mongoose.model('User', userSchema)