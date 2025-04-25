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

//get single user id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id; //get id from url parameter which passed by frontend
    const data = await User.findOne({ _id: id }, { password: 0 }); // here _id is database key where value is id pass which want for find , and password not want to need so pass 0
    if (!data) {
      return res.status(400).json({ msg: "User Not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Delete user id
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id; //get id from url parameter which passed by frontend
    await User.deleteOne({ _id: id }); // here _id is database Object_id key where value id pass which want delete (if it's match any database _id then delete it)
    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.log(error);
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

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById };
