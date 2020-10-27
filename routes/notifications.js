const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET NOTIF
router.get("/",authMiddleware, (req, res) => {
    Notification.find()
    .then((notifications) => res.json(notifications))
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send("Server Error");
    });
});

// ADD NOTIF
router.post("/add",authMiddleware, (req, res) => {
  console.log(req.body)
    Notification.create(req.body)
      .then((notifications) => res.status(201).send(notifications))
      .catch((err) => {
        console.log(err.message);
      });
  });

  module.exports=router

