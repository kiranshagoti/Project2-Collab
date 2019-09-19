const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const deletedSchema = new Schema({
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

const Deleted = mongoose.model('Deleted', deletedSchema);
module.exports = Deleted;
