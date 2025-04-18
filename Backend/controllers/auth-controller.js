// Controller- here handling the application logic , Controllers are typically used to process incoming requests(from routers), interact with models (data sources), and send response back to clients. [MVC pattern]

const User = require("../models/user-model");
// const bcrypt = require("bcryptjs");

//Home logic

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome Home");
  } catch (error) {
    console.log(error);
  }
};

//user Registration logic

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body; // get registration data

    // check email exist in db
    const userExist = await User.findOne({ email: email }); // here email pass and check it's exist or not

    if (userExist) {
      return res.status(400).json({ message: "email already exist" }); //message pass to client
    }

    //^ hash password using bcryptjs (npm package)        - we have 2 option either we use here or use schema(model) where mongoose give pre-method
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    //else register user data in db collection in document form
    const userCreated = await User.create({
      username,
      email,
      phone,
      // password: hash_password,
      password,
    });

    res.status(201).json({
      // now here we pass (jwt) token , userId to the client side
      message: "registration successful",
      token: await userCreated.generateToken(), // fun call
      userId: userCreated._id.toString(), // id convert into string for compatibility ( we know it's object form and we store Jwt in clint side so must convert into string)
    });
  } catch (error) {
    // res.status(500).json({ msg: "internal server error" });
    console.log(req.body);
    next(error);
  }
};

// User Login logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email is exist or not
    const userExist = await User.findOne({ email });

    //if email not exist (means user not Exist)
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    //else(means email exist user exist , so compare password (db password , user type password) using bcrypt)
    // const user = await bcrypt.compare(password, userExist.password);

    //custom compare password check fun create
    const user = await userExist.comparePassword(password); // fun comparePassword call and user type password pass ,  fun define in model

    // password match means user exist so condition true , and login successful and pass jwt
    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // res.status(500).json("internal server error");            // here direct error pass to client
    next(error); // error pass to error-middleware
  }
};

// User logic - to send user data to clientSide

const user = async (req, res) => {
  try {
    const userData = req.user; // here req.user is custom req which define in auth-middleware.js and it contains userData
    console.log("after jwt verification", userData);
    return res.status(200).json({ msg: userData }); // response userData pass to client
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { home, register, login, user };
