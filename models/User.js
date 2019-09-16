const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  slackID: String,
  gitHubID: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;

