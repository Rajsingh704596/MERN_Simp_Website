const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//schema create
const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
});

//^ secure the password (hash)with the bcryptjs using pre method which gives by mongoose
userSchema.pre("save", async function () {
  // it's work like middleware where it run this fun before create/save document in collection inside db
  // console.log("pre method", this); // here this keyword gives current register details

  const user = this;

  // if password not modified(means already secure by bcrypt) so next step go to auth-controller ( that is store in db)
  if (!user.isModified("password")) {
    next();
  }
  // else password secure with hash pass
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password; // here actual password change with hash_password          // then next go to auth-controller
  } catch (error) {
    next(error);
  }
});

// define the model/collection name
const User = new mongoose.model("User", userSchema); // so now, In mongodb collection name created users

module.exports = User;
