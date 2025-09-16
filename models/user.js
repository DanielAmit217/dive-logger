const mongoose = require("mongoose");

const gearSchema = new mongoose.Schema({});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gear: [gearSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
