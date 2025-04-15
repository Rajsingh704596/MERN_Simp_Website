const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//schema create for user register or login
const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
});

//^ secure the password (hash)with the bcryptjs using ' pre method ' which gives by mongoose
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

//^ Compare the password in instance methods(fun)
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); //  here compare db password , userType pass which get using this
};

//^ json web token instance methods create   -       (userSchema.methods - it's method use to create many instance of method(fun) )
// and we access this part in controller
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      // Json web token create using jwt.sign
      {
        //payload pass
        userId: this._id.toString(), // id convert into string and pass
        email: this.email,
        isAdmin: this.isAdmin,
      },
      //here signature key pass
      process.env.JWT_SIGNATURE_SECRET_KEY,
      {
        //optional for expire token
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// define the model/collection name
const User = new mongoose.model("User", userSchema); // so now, In mongodb collection name created users

module.exports = User;

// npm i jsonwebtoken
//? JWT (Jason Web Token)- it is open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
//? it's use for Authentication(Verify the identity of user) and Authorization(what action a user/client is allowed to perform)
//? JWT have 3 Components -
//^ 1. Header - contain meta data about the token
//^ 2. Payload- contain additional data (like user id , user name, expiration time)
//^ 3. Signature- secret sign which only know by server

//todo-  JWT issued by server for authentication process and always store in Client side( in the form of cookies or local storage) not database.
