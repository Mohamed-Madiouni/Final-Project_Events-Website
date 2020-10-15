const express = require("express")
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Comment = require('../models/Comment')
const authMiddleware = require("../middleware/authMiddleware");




//create comments
router.post("/add",authMiddleware,(req,res)=>{
    let newComent = new Comment({
      content:req.body.content,
      postedBy:req.body.postedBy,
      event:req.body.event
   
    })
   
     newComent.save()
     .then(com=>{res.status(201).send(com)})
     .catch(err=>res.status(402).send(err.message))
   })
   
   //get comments
   router.get("/",(req,res)=>{
    Comment.find()
    .then(com=>res.status(200).send(com))
    .catch((err)=>res.status(402).send(err.message))
   })
   //Edit comment
   router.put("/comment/:commentId",async(req,res)=>{
     const comment = await Comment.findOneAndUpdate({
       _id:req.params.commentId
     },req.body,
     {
       new:true,
       runValidators:true
     })
     res.send(comment)
   })
   //delete comment 
   router.delete("/comment/:commentId",async(req,res)=>{
     const comment = await Comment.findOneAndRemove(req.params.commentId)
     res.send({ msg: "comment Deleted!" })
   
   })


   module.exports= router