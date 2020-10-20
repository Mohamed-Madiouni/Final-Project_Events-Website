const mongoose = require("mongoose");
const schema = mongoose.Schema;
const EventSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  nb_participant: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: "Invalid",
    required: true,
  },
  id_organizer: {
    type: String,
    required: true,
  },
  participant: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  tags:{
  type:  [String],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

});
module.exports = mongoose.model("event", EventSchema);
