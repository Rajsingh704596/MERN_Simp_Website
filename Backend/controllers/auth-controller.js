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

//Registration logic

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body; // get registration data

    // check email exist in db
    const userExist = await User.findOne({ email: email }); // here email pass and check it's exist or not

    if (userExist) {
      return res.status(400).json({ msg: "email already exist" });
    }

    //^ hash password using bcryptjs (npm package)        - we have 2 option either we use here or use schema where mongoose give pre-method
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

    res.status(201).json({ message: userCreated });
  } catch (error) {
    res.status(400).json({ msg: "internal server error" });
  }
};
module.exports = { home, register };
