const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ChatSchema = new schema({
     users:[],
     discussion:[],
    created_at: {
        type: Date,
        default: Date.now,
      },
     sendby:{
         type:String,
         required:true
     },
     sendat:{
         type:Date
     }
});
module.exports = mongoose.model("chat", ChatSchema);
