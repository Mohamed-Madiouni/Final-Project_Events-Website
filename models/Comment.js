const mongoose = require("mongoose");
const schema = mongoose.Schema;
const CommentSchema = new schema({
    content: { 
        type: String,
         required: true 
        },
     event:{
          type: mongoose.Types.ObjectId, 
          ref: "event" 
        },
     
    postedBy:{
         type: mongoose.Types.ObjectId, 
         ref: "user" 
        },
        reply:[],
        likes:{
            type:Number,
            default:0
        },
        dislikes:{
            type:Number,
            default:0
        },
    created_at: {
        type: Date,
        default: Date.now,
      },
     
});
module.exports = mongoose.model("comment", CommentSchema);
