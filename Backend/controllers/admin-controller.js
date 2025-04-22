const User = require("../models/user-model");
const Contact = require("../models/contact-model");

// Get all users logic
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // User collection all data get as a tease only password field don't show
    console.log(users);

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No Users found" });
    }

    return res.status(200).json(users); //pass to admin dashboard
  } catch (error) {
    next(error);
  }
};

//Get all contacts logic
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // get all contact from Contact collection in db
    console.log(contacts);

    if (!contacts || (await contacts.length) === 0) {
      return res.status(404).json({ msg: "No Contacts Data found" });
    }

    res.status(200).json(contacts); // response pass to admin dashboard
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllContacts };
