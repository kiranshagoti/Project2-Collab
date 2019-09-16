const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const boardSchema = new Schema({
  name: String,
  description: String,
  tasks: [{
    name: String,
    task: String,
    owner: {
      type: String, //Schema.Types.ObjectId,
      default: "user"
    },
    status: {
      type: String,
      enum: ["Stuck", "Working on it", "Done", "Waiting for review"],
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ["Urgent", "High", "Medium", "Low"],
    },
    comment: String,
    people: {
      type: String,
      // default: 
    },
    timeline: {
      startDate: Date,
      endDate: Date
    },
    files: {
      type: String,
      enum: ["From Computer", "From Google Drive", "From Dropbox"]
    }
}]
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
