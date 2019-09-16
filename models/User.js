const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
  githubID: String,
  slackID: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

