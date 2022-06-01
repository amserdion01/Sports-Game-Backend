const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorEmail: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  currentPlayers: [{
    type: String,
  }],
  maxPlayers: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Create model
const Event = mongoose.model("event", EventSchema);

//Export model
module.exports = Event;
