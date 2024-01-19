const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  password: {
    type: String,
    required: [true, "A user must need to provide the password"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
