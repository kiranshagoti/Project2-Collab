const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  newTask: [{
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

const Projects = mongoose.model('Projects', projectSchema);
module.exports = Projects;
