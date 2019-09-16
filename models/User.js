const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  githubID: String,
  slackID: String,
  unique: true,
  required: true,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

