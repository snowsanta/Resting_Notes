const mongoose = require("mongoose");

// connection to users collection

const conn = mongoose.createConnection(
  "mongodb+srv://admin:" +
    process.env.mongoPW +
    "@note-app.ttnbl.mongodb.net/users?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = conn;
