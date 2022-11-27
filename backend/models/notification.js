const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, require: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  read: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Notification", notificationSchema);