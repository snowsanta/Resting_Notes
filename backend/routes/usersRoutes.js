const express = require("express");
const router = express.Router();
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_check = require("../middlewares/auth-check");

const mongoose = require("mongoose");
const userConn = require("../connections/userConn");

// routes in /users

router.get("/", auth_check, (req, res, next) => {
  var User = userConn.model("User", require("../routes/models/usermodel"));
  var currUser = User.find({ email: req.userData.email });
  if (currUser.permission == "Admin") {
    User.find()
      .exec()
      .then((results) => res.status(200).json(results))
      .catch((err) => console.log(err));
  } else {
    req.status(401).json({ mesage: "Permisson not granted" });
  }
});

router.post("/signup", (req, res, next) => {
  var User = userConn.model("User", require("../routes/models/usermodel"));
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length == 0) {
        crypt.hash(req.body.password, 10, (err, pass) => {
          if (pass) {
            const newUser = User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: pass,
              created: Date.now(),
              permission: "String",
            });

            newUser.save().then((result) => {
              res.status(401).json({ message: "user created" });
            });
          } else {
            res.status(303).json({ message: "password hashing failed" });
          }
        });
      } else {
        res.status(500).json({ message: "email already registered" });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res, next) => {
  var User = userConn.model("User", require("../routes/models/usermodel"));
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        crypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(500).json({ error: error });
          }
          if (result) {
            const token = jwt.sign(
              { origin: "Resting_node", userId: user[0]._id },
              process.env.jwtkey,
              { expiresIn: "2h" }
            );

            res
              .status(200)
              .json({ message: "Signed in", token: "Bearer " + token });
          } else {
            res.status(401).json({ message: "Auth failed" });
          }
        });
      } else {
        res.status(401).json({ message: "Auth failed" });
      }
    })
    .catch((err) => console.log(err));
});

router.delete("/signout", auth_check, (req, res, next) => {
  var User = userConn.model("User", require("../routes/models/usermodel"));
  User.find({ _id: req.userData.userId })
    .exec()
    .then((user) => {
      console.log(user);
      if (user.length > 0) {
        crypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res
              .status(500)
              .json({ message: "error in comparing password", err: error });
          }
          if (result) {
            User.findByIdAndDelete(req.userData.userId)
              .exec()
              .then((deleteduser) => {
                res
                  .status(200)
                  .json({ message: "User deleted", deleteduser: deleteduser });
              })
              .catch((err) =>
                res.status(500).json({ message: "User not deleted", err: err })
              );
          } else {
            res.status(401).json({ message: "Password in incorrect" });
          }
        });
      } else {
        res.status(401).json({ message: "Password y incorrect" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
