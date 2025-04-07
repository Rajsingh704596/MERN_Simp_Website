// Controller- here handling the application logic , Controllers are typically used to process incoming requests(from routers), interact with models (data sources), and send response back to clients. [MVC pattern]

const User = require("../models/user-model");

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

    //else register user data in db collection in document form
    const userCreated = await User.create({ username, email, phone, password });

    res.status(200).json({ message: userCreated });
    // res.status(200).send("welcome to registration page using Controllers");
  } catch (error) {
    res.status(400).json({ msg: "internal server error" });
  }
};
module.exports = { home, register };
