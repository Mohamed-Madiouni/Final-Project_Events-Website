const express = require("express")
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const authMiddleware = require("../middleware/authMiddleware");
const validateEventsInput = require("../validation/events");


//add event
router.post("/add",authMiddleware, (req, res) => {
  const { errors, isValid } = validateEventsInput(req.body);

  if (!isValid) {
    return res.status(400).json({msg:"insert all field"});
  }


  Event.create(req.body)
    .then((event) => res.status(201).send(event))
    .catch((err) => {
      console.log(err.message);
    });
});

// Get all Events
router.get('/all',(req,res)=>{
  Event.find((err, events) => {
         if (err) {
           console.log(err.message);
          // return res.status(500).send("Server Error");
        }
        res.status(200).json(events);
     });
     
})

// Get all Events of organizer
router.get('/all/organizer',authMiddleware,(req,res)=>{
  Event.find({id_organizer:req.userId},(err, events) => {
         if (err) {
           console.log(err.message);
          // return res.status(500).send(err.message);
        }
        res.status(200).json(events);
     });
     
})


//get event by Id
router.get("/eventid/:id", (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    } else if (event) {
      res.status(200).send(event);
    } else {
      res.json({ msg: "Event not found" });
    }
  });
});



//open event

router.put("/edit/open/:id",authMiddleware, (req, res) => {
  const evt = req.body;
  Event.findByIdAndUpdate(
    req.params.id,
    { $set: evt },
    { new: true },
    (err, event) => {
      if (err) {
        console.log(err.message);
        // return res.status(500).send("Server Error");
      }
      res.send(event);
    }
  );
});

//close events that ended

router.put("/edit/close/",authMiddleware, (req, res) => {
  const evt = req.body;
  Event.updateMany(
    {state:"Available"},
    { $set: evt },
    { new: true },
    (err, event) => {
      if (err) {
        console.log(err.message);
        // return res.status(500).send("Server Error");
      }
      res.send(event);
    }
  );
});


//ended event by ID

router.put("/edit/end/:id",authMiddleware, (req, res) => {
  const evt = req.body;
  Event.findByIdAndUpdate(
    req.params.id,
    { $set: evt },
    { new: true },
    (err, event) => {
      if (err) {
        console.log(err.message);
        // return res.status(500).send("Server Error");
      }
      res.send(event);
    }
  );
});

//close event by ID

router.put("/edit/close/:id",authMiddleware, (req, res) => {
  const evt = req.body;
  Event.findByIdAndUpdate(
    req.params.id,
    { $set: evt },
    { new: true },
    (err, event) => {
      if (err) {
        console.log(err.message);
        // return res.status(500).send("Server Error");
      }
      res.send(event);
    }
  );
});



// Edit event by Id
router.put("/edit/:id",authMiddleware, (req, res) => {
  const evt = req.body;
  let evtUpdated={}
  evt.title && (evtUpdated.title= evt.title);
      evt.address&& (evtUpdated.address=evt.address),
      evt.description&&( evtUpdated.description=evt.description),
      evt.date&& ( evtUpdated.date=evt.date),
      evt.duration&& (evtUpdated.duration=evt.duration),
      evt.nb_participant&& (evtUpdated.nb_participant=evt.nb_participant),
      evtUpdated.image=evt.image
      evtUpdated.tags=evt.tags
     
  Event.findByIdAndUpdate(
    req.params.id,
    { $set: evtUpdated },
    { new: true },
    (err, event) => {
      if (err) {
        console.log(err.message);
        // return res.status(500).send("Server Error");
      }
      res.send(event);
    }
  );
});
//Delete Event by Id
router.delete("/delete/:id",authMiddleware, (req, res) => {
  const {_id}= req.params
  Event.findByIdAndRemove(req.params.id)
    .then(() => res.send({ msg: "Event Deleted!" }))
    .catch((err) => {
      console.log(err.message);
      // res.status(500).send("Server Error");
    });
});

//Particiaption

router.put('/follow',authMiddleware, (req, res) => {
  Event.findByIdAndUpdate(req.body.followId ,{
  $push:{participant:req.userId}},
  {
  new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err.message})
    }else{
      
      User.findById(req.userId)
       .then(user => {
         if(!user){
           return res.status(404).send({msg: "User not found!"})
         }
        
         user.events.push(req.body.followId)
         user.save()
         res.json(result)
       })
    }
   })
   // Event.findByIdAndUpdate(req.body.followId ,{
   //   $push:{reservation:req.userId._id}},
   //   {
   //   new:true
   //   }).exec((err,result)=>{
   //     if(err){
   //       return res.status(422).json({error:err})
   //     }else{
   //       res.json(result)
   //     }
   //    })
  })
 router.put('/unfollow',authMiddleware, (req, res) => {
   Event.findByIdAndUpdate(req.body.unfollowId ,{
   $pull:{participant:req.userId._id}},
   {
   new:true
   }).exec((err,result)=>{
     if(err){
       return res.status(422).json({error:err})
     }else{
       User.findById(req.userId._id)
        .then(user => {
          if(!user){
            return res.status(404).send({msg: "User not found!"})
          }
          user.events.push(req.body.unfollowId)
          user.save()
          res.json(result)
        })
     }
    })
    // Event.findByIdAndUpdate(req.body.unfollowId ,{
    //   $push:{reservation:req.userId._id}},
    //   {
    //   new:true
    //   }).exec((err,result)=>{
    //     if(err){
    //       return res.status(422).json({error:err})
    //     }else{
    //       res.json(result)
    //     }
    //    })
   })



module.exports= router