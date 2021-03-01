const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const Sanction = require("../models/Sanction");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

var Pusher = require('pusher');
require("dotenv").config();

var pusher = new Pusher({
  appId:"1092374",
  key: "16ca3006a08827062073",
  secret: "d68755f8ef8b5528389a",
  cluster: 'eu',
  useTLS: true,
});


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
     
      res.status(500).send("Server Error");
  });
  Comment.deleteMany({ event: _id })
    .then(() => res.send({ msg: "Comments Deleted!" }))
    .catch((err) => {
     
      res.status(500).send("Server Error");
  });
});

//Delete User by Id
router.delete("/users/delete/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
User.findByIdAndRemove(_id).then(() => res.send({ msg: "User Deleted!" }))
.catch((err) => {
 
  res.status(500).send("Server Error");
});
//console.log(_id);
Comment.deleteMany({ postedBy: _id })
.then(() => res.send({ msg: "Comments Deleted!" }))
.catch((err) => {

  res.status(500).send("Server Error");
});

Event.find({ id_organizer: _id }).then(events=>{for (let i = 0; i < events.length; i++){
  //console.log(events[i]._id);
  Comment.deleteMany({event:events[i]._id})
  .then(() => res.send({ msg: "Comments Deleted!" }))
  .catch((err) => {
    res.status(500).send("Server Error");
  });
}});

Event.deleteMany({ id_organizer: _id })
   .then(() => res.send({ msg: "Events Deleted!" }))
   .catch((err) => {
     res.status(500).send("Server Error");
   });
});

// GET SANCTIONS
router.get("/sanctions", (req, res) => {
  Sanction.find()
    .then((sanctions) => res.json(sanctions))
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send("Server Error");
    });
});

//Ban User by Id
router.post("/sanction/ban/add", authMiddleware, (req, res) => {
  let newSanction = new Sanction({
    email:req.body.email,
    type:req.body.type,
    duration:req.body.duration,
    reason:req.body.reason,
    author:req.body.author  
  })
  newSanction.save()
  .then((sanction) => {
    pusher.trigger('sanction', 'sanction', {
      'message': 'hello world'
    });  
    
    res.status(201).send(sanction)
  
    })
    .catch(err=>res.status(402).send(err.message))
});

//Unban User by Id
router.put("/sanction/ban/delete/:email", authMiddleware, (req, res) => {
  
  Sanction.findOneAndUpdate({
    email : req.params.email, type: "ban"},
    {
      $set: {
        canceled: req.body.canceled,
        cancelreason:req.body.cancelreason, 
        cancelauthor:req.body.cancelauthor,
        cancelled_at: req.body.cancelled_at
      },
    },
    {upsert: true,
      sort: { created_at: -1 },
       new: true }
  )
  .then(() => {
    pusher.trigger('sanction', 'sanction', {
      'message': 'hello world'
    });    
    res.send({ msg: "Ban cancelled" })
    .catch((err) => {
    
    res.status(500).send("Server Error");
  });
});
});


//Alert
router.post("/sanction/alert/add", authMiddleware, (req, res) => {
  let newSanction = new Sanction({
    email:req.body.email,
    type:req.body.type,
    duration:req.body.duration,
    reason:req.body.reason,
    author:req.body.author  
  })
  newSanction.save()
  .then((sanction) => {
    pusher.trigger('sanction', 'sanction', {
      'message': 'hello world'
    });  
    
    res.status(201).send(sanction)
  
    })
    .catch(err=>res.status(402).send(err.message))
});


//Remove Alert
router.put("/sanction/alert/delete/:email", authMiddleware, (req, res) => {

  Sanction.findOneAndUpdate({
    email : req.params.email, type: "alert"},
    {
      $set: {
        canceled: req.body.canceled,
        cancelreason:req.body.cancelreason, 
        cancelauthor:req.body.cancelauthor,
        cancelled_at: req.body.cancelled_at
      }
    },
    {  
      upsert: true,
      sort: { created_at: -1 },
    new: true }
  )
  .then(() => {
    pusher.trigger('sanction', 'sanction', {
      'message': 'hello world'
    });    
    res.send({ msg: "Alert Cancelled!" })
    .catch((err) => {
  
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


//Add modo
router.put("/users/addmodo/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
  User.findByIdAndUpdate(
    _id,
    {
      $set: {
        role: "moderator"
      },
    },
    { new: true }
  )
    .then((modo) => res.send({ role: "moderator" }))
    .catch((err) => console.log(err.message));
});


//Remove modo
router.put("/users/removemodo/:_id", authMiddleware, (req, res) => {
  var _id = req.params._id;
  User.findByIdAndUpdate(
    _id,
    {
      $set: {
        role: "participant"
      },
    },
    { new: true }
  )
    .then((modo) => res.send({ role: "participant" }))
    .catch((err) => console.log(err.message));
});


module.exports = router;


