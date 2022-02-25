const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  start_time: { type: String, required: true},
  end_time: { type: String, required: true},
  meeting_date: { type: String, required: true}
});

const Meeting = mongoose.model("Meeting", schema);

module.exports = Meeting;
