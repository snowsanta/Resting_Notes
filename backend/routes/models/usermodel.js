const mongoose = require("mongoose");

// model to use for users
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
  created: Date,
  permission: String,
});

module.exports = userSchema;
