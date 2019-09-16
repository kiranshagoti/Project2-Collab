const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const deletedSchema = new Schema({
name: String,
date: Date,
});

const Deleted = mongoose.model('Deleted', deletedSchema);
module.exports = Deleted;
