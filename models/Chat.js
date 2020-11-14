const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ChatSchema = new schema({
     users:[],
     discussion:[],
    created_at: {
        type: Date,
        default: Date.now,
      },
     
});
module.exports = mongoose.model("chat", ChatSchema);
