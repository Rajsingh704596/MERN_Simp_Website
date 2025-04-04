const express = require("express");
const { home, register } = require("../controllers/auth-controller");
const router = express.Router();

// router.get("/register", (req, res) => {
//   res.status(200).send("hi router");
// });

// router.route("/register").get((req, res) => {
//   res.status(200).send("other way");
// });

router.route("/").get(home);
router.route("/register").get(register);

module.exports = router;
