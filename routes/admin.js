const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET USERS
router.get("/users", authMiddleware, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send("Server Error");
    });
});

// GET EVENTS
router.get("/events", authMiddleware, (req, res) => {
  Event.find((err, events) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
    res.status(200).json(events);
  });
});

//Delete Event by Id
router.delete("/events/delete/:_id", authMiddleware, (req, res) => {
  const { _id } = req.params;
  Event.findByIdAndRemove({ _id })
    .then(() => res.send({ msg: "Event Deleted!" }))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});

//Delete User by Id
router.delete("/users/delete/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
  User.findByIdAndRemove(_id).then(() => res.send({ msg: "User Deleted!" }));
  Event.deleteMany({ id_organizer: _id })
    .then(() => res.send({ msg: "Events Deleted!" }))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});

//Ban User by Id
router.put("/users/ban/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
  let nowdate = new Date();
  User.findByIdAndUpdate(
    _id,
    {
      $set: {
        banned_date: new Date(
          nowdate.getFullYear(),
          nowdate.getMonth(),
          nowdate.getDate() + 7
        ),
      },
    },
    { new: true }
  )
    .then((userbanned) => res.send({ banned: "ok" }))
    .catch((err) => console.log(err.message));
});

module.exports = router;
