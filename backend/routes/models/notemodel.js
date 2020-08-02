const mongoose = require("mongoose");

// model to use for note object
const noteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String,
  created: Date,
  color: String,
});

module.exports = noteSchema;
