const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
var Pusher = require('pusher');
require("dotenv").config();

var pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'eu',
  useTLS: true,
});



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
      .then((notifications) => {

        pusher.trigger('channel1', 'notification', {
          'message': 'hello world'
        });  
      
        res.status(201).send(notifications)
      
      })
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
     Notification.find({_id:{$in:t1}},(err,notifications)=>{

  if (err) 
   {
         console.log(err.message);
       }

for (let i = 0;  i< notifications.length; i++) {
          for (let j = 0; j < notifications[i].state.length; j++) {
            if (notifications[i].state[j].users === req.userId && notifications[i].state[j].consulted === false)
            notifications[i].state[j].consulted=true
           
        }}
        // Notification.save((err,notf)=>{
        //   if (err) throw err
        //   console.log(notf)
        // })
    //  console.log(notifications)
for(let i=0;i<notifications.length;i++)
    {  
      Notification.replaceOne({_id:notifications[i]._id},notifications[i],(err,notf)=>{
       if (err) throw err
      //  console.log(notf)
     })
    
    }
    pusher.trigger('channel1', 'notification', {
      'message': 'hello world'
    });
    res.status(201).send(notifications)
  })

})
  module.exports=router

