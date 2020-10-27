const express = require("express");
const Notification = require("../models/Notifications");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET NOTIF
router.get("/notifications", (req, res) => {
    Notifications.find()
    .then((notifications) => res.json(notifications))
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send("Server Error");
    });
});

// ADD NOTIF
router.post("/addnotif",authMiddleware, (req, res) => {
  
    Notification.create(req.body)
      .then((notifications) => res.status(201).send(notifications))
      .catch((err) => {
        console.log(err.message);
      });
  });