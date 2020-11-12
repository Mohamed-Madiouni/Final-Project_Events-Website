const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const Sanction = require("../models/Sanction");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET USERS
router.get("/users", (req, res) => {
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
  Comment.deleteMany({ event: _id })
    .then(() => res.send({ msg: "Comments Deleted!" }))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
  });
});

//Delete User by Id
router.delete("/users/delete/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
User.findByIdAndRemove(_id).then(() => res.send({ msg: "User Deleted!" }))
.catch((err) => {
  console.log(err.message);
  res.status(500).send("Server Error");
});
//console.log(_id);
Comment.deleteMany({ postedBy: _id })
.then(() => res.send({ msg: "Comments Deleted!" }))
.catch((err) => {
  console.log(err.message);
  res.status(500).send("Server Error");
});

Event.find({ id_organizer: _id }).then(events=>{for (let i = 0; i < events.length; i++){
  //console.log(events[i]._id);
  Comment.deleteMany({event:events[i]._id})
  .then(() => res.send({ msg: "Comments Deleted!" }))
  .catch((err) => {
    console.log(err.message);
    res.status(500).send("Server Error");
  });
}});

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
  User.findByIdAndUpdate(
    _id,
    {
      $set: {
        banned: true
      },
    },
    { new: true }
  )
    .then((userbanned) => res.send({ banned: "ok" }))
    .catch((err) => console.log(err.message));
});


//Unban User by Id
router.put("/users/unban/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;

  User.findByIdAndUpdate(
    _id,
    {
      $set: {
        banned: false
      },
    },
    { new: true }
  )
    .then((userunbanned) => res.send({ unbanned: "ok" }))
    .catch((err) => console.log(err.message));
});


//Alert
router.put("/sanction/alert/add/:email", authMiddleware, (req, res) => {
  let newSanction = new Sanction({
    email:req.body.email,
    type:req.body.type,
    duration:req.body.duration,
    reason:req.body.reason    
  })
  newSanction.save()
  .then((saction) => {
    pusher.trigger('channel1', 'sanction', {
      'message': 'hello world'
    });  
    
    res.status(201).send(saction)
  
    })
    .catch(err=>res.status(402).send(err.message))
});


//Remove Alert
router.delete("/sanction/alert/delete/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
  Sanction.findByIdAndRemove(_id).then(() => {
    pusher.trigger('channel1', 'sanction', {
      'message': 'hello world'
    });  
    res.send({ msg: "Alert Deleted!" })
    .catch((err) => {
    console.log(err.message);
    res.status(500).send("Server Error");
  });
  });
});


//valid event by Id
router.put("/events/valid/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
  Event.findByIdAndUpdate(
    _id,
    {
      $set: {
        state: "Available"
      },
    },
    { new: true }
  )
    .then((eventvalid) => res.send({ valid: "ok" }))
    .catch((err) => console.log(err.message));
});


//Unvalid event by Id
router.put("/events/invalid/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
  Event.findByIdAndUpdate(
    _id,
    {
      $set: {
        state: "Invalid"
      },
    },
    { new: true }
  )
    .then((eventvalid) => res.send({ unvalid: "ok" }))
    .catch((err) => console.log(err.message));
});

module.exports = router;


