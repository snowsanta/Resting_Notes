const express = require("express");
const router = express.Router();
const auth_check = require("../middlewares/auth-check");

const mongoose = require("mongoose");
const noteSchema = require("./models/notemodel.js");

// routes in /notes

router.get("/", auth_check, (req, res, next) => {
  const Note = mongoose.model("Note", noteSchema, req.userData.userId);
  Note.find()
    .select("_id title body color")
    .exec()
    .then((results) => {
      res.status(200).json({
        nlen: results.length,
        notes: results,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/", auth_check, (req, res, next) => {
  const Note = mongoose.model("Note", noteSchema, req.userData.userId);
  const note = Note({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
    color: req.body.color,
    created: Date.now(),
  });

  note
    .save()
    .then((result) => {
      res.status(201).json({
        message: "created note",
        note: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.get("/:noteId", auth_check, (req, res, next) => {
  const Note = mongoose.model("Note", noteSchema, req.userData.userId);
  Note.findById(req.params.noteId)
    .select("_id title body color")
    .exec()
    .then((result) => {
      res.status(200).json({
        note: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.patch("/:noteId", auth_check, (req, res, next) => {
  const Note = mongoose.model("Note", noteSchema, req.userData.userId);
  const updateOps = {};

  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }

  Note.findByIdAndUpdate(req.params.noteId, updateOps)
    .exec()
    .then((results) => {
      res
        .status(200)
        .json({ message: "updated", older: results, ops: updateOps });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.delete("/:noteId", auth_check, (req, res, next) => {
  const Note = mongoose.model("Note", noteSchema, req.userData.userId);
  Note.findByIdAndDelete(req.params.noteId)
    .exec()
    .then((results) => {
      res.status(200).json({ result: results, message: "deleted" });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
