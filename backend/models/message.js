const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, require: true },
  senderID: { type: mongoose.Schema.Types.ObjectId, require: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Message", messageSchema);