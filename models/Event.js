const mongoose =require ("mongoose")
const schema = mongoose.Schema
const EventSchema = new schema({
    title:{type:String,
        required: true,
},
    discription:{type:String,
        required: true,},
    date:{type:String,
        required: true,
    },
    adress:{type:String,
        required: true,
    },
      duration:{type:String,
        required: true,
    },
    Nb_participant:{type:Number,
        required: true,
    },
    created_at: {
        type: Date,
         default: Date.now,
          },
})
module.exports=Event=mongoose.model('event',EventSchema)