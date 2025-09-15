const mongoose = require("mongoose");

const diveSchema = new mongoose.Schema({
  name: String,
  location: String,
  depth: Number,
  time: String,
  weight: Number,
  description: String,
  image: String,
  diver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Dive = mongoose.model("Dive", diveSchema);

module.exports = Dive;
