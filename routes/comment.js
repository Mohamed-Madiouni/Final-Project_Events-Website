const express = require("express")
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Comment = require('../models/Comment')
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


//create comments
router.post("/add",authMiddleware,(req,res)=>{
    let newComent = new Comment({
      content:req.body.content,
      postedBy:req.body.postedBy,
      event:req.body.event
   
    })
   
     newComent.save()
     .then(com=>{
      pusher.trigger('my-channel', 'my-event', {
        'message': 'hello world'
      });
      
      res.status(201).send(com)
      })
     .catch(err=>res.status(402).send(err.message))
   })
   
   //get comments
   router.get("/",(req,res)=>{
    Comment.find()
    .then(com=>res.status(200).send(com))
    .catch((err)=>res.status(402).send(err.message))
   })


   //Edit comment
   router.put("/edit/:commentId",authMiddleware,(req,res)=>{
     Comment.findOneAndUpdate({
       _id:req.params.commentId
     },{content:req.body.newContent},
     {
       new:true,
       runValidators:true
     })
     .then(com=>{
      pusher.trigger('my-channel', 'my-event', {
        'message': 'hello world'
      });   
      res.status(202).send(com)
    })
     .catch(err=>res.status(404).send(err.message))
   })


   //delete comment 
   router.delete("/delete/:commentId",authMiddleware,(req,res)=>{
     Comment.findOneAndRemove({_id:req.params.commentId})
     .then(del=> {
      pusher.trigger('my-channel', 'my-event', {
        'message': 'hello world'
      });
      res.send({ msg: "comment Deleted!" })
    })
     .catch(err=>res.status(404).send(err.message))
   
   })


//like

router.put("/add/like/:commentId",authMiddleware,(req,res)=>{
 
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$set:{likes: req.body.likes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });  
User.findByIdAndUpdate(req.body.user,{$push:{likes:req.params.commentId}},(err,user)=>{
  if (err) throw err
  // console.log(user)
})
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})


//removelike

router.put("/add/like/remove/:commentId",authMiddleware,(req,res)=>{
 
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$set:{likes: req.body.likes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });  
User.findByIdAndUpdate(req.body.user,{$pull:{likes:req.params.commentId}},(err,user)=>{
  if (err) throw err
  // console.log(user)
})
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

//dislike

router.put("/add/dislike/:commentId",authMiddleware,(req,res)=>{
 
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$set:{dislikes: req.body.dislikes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });  
User.findByIdAndUpdate(req.body.user,{$push:{dislikes:req.params.commentId}},(err,user)=>{
  if (err) throw err
  // console.log(user)
})
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

//removedisllike

router.put("/add/dislike/remove/:commentId",authMiddleware,(req,res)=>{
 
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$set:{dislikes: req.body.dislikes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });  
User.findByIdAndUpdate(req.body.user,{$pull:{dislikes:req.params.commentId}},(err,user)=>{
  if (err) throw err
  // console.log(user)
})
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})
//reply

router.put("/add/reply/:commentId",authMiddleware,(req,res)=>{
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$push: {reply:req.body}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });  
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

//like reply
router.put("/add/like/reply/:replyId",authMiddleware,(req,res)=>{
  
  Comment.findOneAndUpdate(
    {"reply.id":req.params.replyId}
  ,{$set:{"reply.$.likes":req.body.likes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
    User.findByIdAndUpdate(req.body.user,{$push:{likes:req.params.replyId}},(err,user)=>{
      if (err) throw err
      // console.log(user)
    })

    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

//removelike reply
router.put("/add/like/reply/remove/:replyId",authMiddleware,(req,res)=>{
  
  Comment.findOneAndUpdate(
    {"reply.id":req.params.replyId}
  ,{$set:{"reply.$.likes":req.body.likes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
    User.findByIdAndUpdate(req.body.user,{$pull:{likes:req.params.replyId}},(err,user)=>{
      if (err) throw err
      // console.log(user)
    })

    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})


//dislike reply
router.put("/add/dislike/reply/:replyId",authMiddleware,(req,res)=>{
  
  Comment.findOneAndUpdate(
    {"reply.id":req.params.replyId}
  ,{$set:{"reply.$.dislikes":req.body.dislikes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
    User.findByIdAndUpdate(req.body.user,{$push:{dislikes:req.params.replyId}},(err,user)=>{
      if (err) throw err
      // console.log(user)
    })

    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

//removedislike reply
router.put("/add/dislike/reply/remove/:replyId",authMiddleware,(req,res)=>{
  
  Comment.findOneAndUpdate({"reply.id":req.params.replyId},{$set:{"reply.$.dislikes":req.body.dislikes}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
    User.findByIdAndUpdate(req.body.user,{$pull:{dislikes:req.params.replyId}},(err,user)=>{
      if (err) throw err
      // console.log(user)
    })

    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})


 //Edit reply
//  router.put("/edit/reply/:commentId",authMiddleware,(req,res)=>{
//   Comment.findOne({
//     _id:req.params.commentId
//   })
//   .then(com=>{
//     com.reply.find(el=>el.id==req.body.id_reply).content=req.body.newContent
      
//       com.save((err,newrep)=>{
//         if(err)
//         throw err
//         console.log(newrep);res.status(202).send(newrep)})
    
// console.log(com)
//   })
//   .catch(err=>res.status(404).send(err.message))
// })

router.put("/edit/reply/:replyId",authMiddleware,(req,res)=>{
  Comment.findOneAndUpdate(
    {"reply.id":req.body.id_reply}
  ,{$set:{"reply.$.content":req.body.newContent}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

 //delete reply 
 router.put("/delete/reply/:replyId",authMiddleware,(req,res)=>{
//  console.log(req.body)
  Comment.findOneAndUpdate({"reply.id":req.params.replyId},{$pull:{reply:{id:req.body.reply_id}}})
  .then(del=> {
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
     res.send({ msg: "reaction Deleted!" })})
  .catch(err=>res.status(404).send(err.message))

})

//Report reply
router.put("/add/reply/report/:replyId",authMiddleware,(req,res)=>{
  
  Comment.findOneAndUpdate({_id:req.body.comment,"reply.id":req.params.replyId}
  ,{$set:{"reply.$.reports":req.body.reports}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
    User.findByIdAndUpdate(req.body.user,{$push:{reports:req.params.replyId}},(err,user)=>{
      if (err) throw err
      // console.log(user)
    })

    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

//Report comment
router.put("/add/comment/report/:commentId",authMiddleware,(req,res)=>{
 
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$set:{reports: req.body.reports}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });  
User.findByIdAndUpdate(req.body.user,{$push:{reports:req.params.commentId}},(err,user)=>{
  if (err) throw err
  // console.log(user)
})
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})



//Remove Report reply
router.put("/remove/reply/report/:replyId",authMiddleware,(req,res)=>{
  // console.log(req.body,req.params.replyId)
  Comment.findOneAndUpdate(
    {"reply.id":req.params.replyId}
  ,{$set:{"reply.$.reports":req.body.reports}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
   
    User.updateMany({reports:req.params.replyId},{$pull:{reports:req.params.replyId}},(err,user)=>{
      if (err) throw err
    
      // console.log(user)
    })
  pusher.trigger('report', 'my-event', {
        'message': 'hello world'
      });
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

//Remove Report comment
router.put("/remove/comment/report/:commentId",authMiddleware,(req,res)=>{
//  console.log(req.body,req.params.commentId)
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$set:{reports: req.body.reports}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    
User.updateMany({reports:req.params.commentId},{$pull:{reports:req.params.commentId}},(err,user)=>{
  if (err) throw err
 
  // console.log(user)
})
 pusher.trigger('report', 'my-event', {
    'message': 'hello world'
  });  
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})









   module.exports= router