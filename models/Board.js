const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  description: String,
  tasks: [{
    name: String,
    responsible: {
      type: String, //Schema.Types.ObjectId,
    },
    status: {
      type: String,
    },
    dueDate: Date,
    priority: {
      type: String,
    },
    comment: String,
    files: {
      name: String,
      path: String,
      contentType: Schema.Types.Mixed
    }
}]
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
