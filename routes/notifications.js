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
  
    Notification.create(req.body)
      .then((notifications) => res.status(201).send(notifications))
      .catch((err) => {
        console.log(err.message);
      });
  });

// ADD CLOSE
router.put("/close",authMiddleware, (req, res) => {

  // console.log(req.body)
  let t1=[]
  req.body.map(el=>t1=[...t1,el._id])
  // console.log((t1))
     Notification.updateMany({_id:{$in:t1}},
       {
         $set:{ 
          "state.$.consulted":true
         },
       }
       )
       .then((notifications) => console.log(notifications))
       .catch((err) => {
         console.log(err.message);
       });
  });

  module.exports=router

