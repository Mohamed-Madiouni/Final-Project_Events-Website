const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  }, 
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  canceled: {
    type: Boolean,
    default: false
  }, 
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("saction", userSchema);
