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


module.exports = router;