const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  UpdateUserById,
  deleteContactsById,
} = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

//Read All User
router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers); //when hit /api/admin/users url first authMiddleware check for admin panel(dashboard) user is login or not (if login means token pass from client to backend then Jwt token verify)  // second adminMiddleware here check after jwt token user data get so it's admin id or not (isAdmin is false or true) if it's true then further next step ,  //then at last all user data show in admin panel from db

//Read Single User by Id
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById); //get method use

// Update User by Id
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, UpdateUserById); //patch method use for Update

// Delete User
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById); //delete method use

// All Contact Data get
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);

//Delete Contact data by Id
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactsById);

module.exports = router;
