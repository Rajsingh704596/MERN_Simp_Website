const mongoose = require("mongoose");

//schema create
const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
});

// define the model/collection name
const User = new mongoose.model("User", userSchema); // so now, In mongodb collection name created users

module.exports = User;
