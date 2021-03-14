const express = require("express")
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Chat = require('../models/Chat')
const authMiddleware = require("../middleware/authMiddleware");
var Pusher = require('pusher');
require("dotenv").config();

// var pusher = new Pusher({
//   app_id:"1092374",
//   key: "16ca3006a08827062073",
//   secret: "d68755f8ef8b5528389a",
//   cluster: 'eu',
//   useTLS: true,
// });

//addnewmessage
router.post("/add/new",authMiddleware,(req,res)=>{

Chat.create({users:req.body.users,discussion:req.body.content,sendby:req.body.sendby,sendat:new Date()},(err,chat)=>{
if(err) res.status(404).send(err.message)
// pusher.trigger('chat', 'my-event', {
//   'message': 'hello world'
// });
res.status(201).send(chat)

})


})


//get diss

router.get("/",authMiddleware,(req,res)=>{
  Chat.find((err,chat)=>{
    if(err) res.status(404).send(err.message)
    res.status(200).send(chat)
  })
})

//talk
router.put("/add/new/:chatId",authMiddleware,(req,res)=>{

  Chat.findByIdAndUpdate(req.params.chatId,{$push:{discussion:req.body.content},$set:{sendby:req.body.sendby,sendat:new Date()}},(err,chat)=>{
  if(err) res.status(404).send(err.message)
  // pusher.trigger('chat', 'my-event', {
  //   'message': 'hello world'
  // });
  res.status(201).send(chat)
  
  })
  
  
  })

  //delete
router.put("/delete/:chatId",authMiddleware,(req,res)=>{
  Chat.findOneAndUpdate({_id:req.params.chatId,"discussion.id":req.body.diss},{$set:{"discussion.$.text":"Message deleted","discussion.$.delete":true}},{
    new:true,
    runValidators:true
  },(err,chat)=>{
  if(err) res.status(404).send(err.message)
  // pusher.trigger('chat', 'my-event', {
  //   'message': 'hello world'
  // });
  res.status(201).send(chat)
  
  })
  
  
  })

module.exports=router