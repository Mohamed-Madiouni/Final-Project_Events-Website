const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET USERS
router.get("/users",authMiddleware, (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.error(err.message);
      });
  });

// GET EVENTS
  router.get("/events",authMiddleware, (req, res) => {
    Event.find()
      .then((events) => res.json(events))
      .catch((err) => {
        console.error(err.message);
      });
  });

//Delete Event by Id
router.delete("/events/delete/:_id",authMiddleware, (req, res) => {
  const {_id}= req.params
  Event.findByIdAndRemove({_id})
    .then(() => res.send({ msg: "Event Deleted!" }))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});

//Delete User by Id
router.delete("/users/delete/:_id",authMiddleware, (req, res) => {
  var _id= req.params._id
  User.findByIdAndRemove(_id)
  .then(() => res.send({ msg: "User Deleted!" }))  
  Event.deleteMany({id_organizer : _id})
  .then(() => res.send({ msg: "Events Deleted!" }))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});
module.exports = router;
