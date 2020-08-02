const express = require("express");
const app = express();
const parser = require("body-parser");
const mongoose = require("mongoose");

const notesRoutes = require("./routes/notesRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const helpdoc = require("./help.json");

// connect to DB; notes collection

mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.mongoPW +
      "@note-app.ttnbl.mongodb.net/notes?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(console.log("connected to Notes"))
  .catch((err) => console.log("not connected", process.env.mongoPW, err));

// parsing request body
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// allow cross origin resource
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//re-routing
app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);
app.get("/api_help", (req, res, next) => {
  res.status(200).json(helpdoc);
});
app.get("/", (req, res, next) => {
  res.status(200).json(helpdoc);
});

module.exports = app;
