const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

// router.get("/register", (req, res) => {
//   res.status(200).send("hsi router");
// });

// router.route("/register").get((req, res) => {
//   res.status(200).send("other way");
// });

router.route("/").get(authController.home);
router.route("/register").post(authController.register);

module.exports = router;
