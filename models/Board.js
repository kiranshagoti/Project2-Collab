const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  description: String,
  tasks: [
    {
    name: String,
    responsible: {
      type: Schema.Types.ObjectId,
      ref: 'User'},
    task: String,
    owner: {
      type: String, 
      default: "user"
    },
    status: {
      type: String,
    },
    dueDate: Date,
    priority: {
      type: String,
    },
    comment: String,
    people: {
      type: String,
      // default: 
    },
    files: {
      name: String,
      path: String,
      contentType: Schema.Types.Mixed
    }}]
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
