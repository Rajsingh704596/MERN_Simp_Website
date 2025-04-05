const mongoose = require("mongoose");

//schema create
const userSchema = new mongoose.Schema({
  username: { type: string, require: true },
  email: { type: string, require: true },
  phone: { type: string, require: true },
  password: { type: string, require: true },
  isAdmin: { type: Boolean, default: false },
});

// define the model/collection name
const User = new mongoose.model("User"); // so now, In mongodb collection name created users

module.exports = User;
