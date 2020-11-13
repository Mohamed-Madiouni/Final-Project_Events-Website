const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ChatSchema = new schema({
    content: { 
        type: String,
         required: true 
        },
     user:[],
     duscussion:[],
    postedBy:{
         type: mongoose.Types.ObjectId, 
         ref: "user" 
        },
    created_at: {
        type: Date,
        default: Date.now,
      },
     
});
module.exports = mongoose.model("chat", ChatSchema);
