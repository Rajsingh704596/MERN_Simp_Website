const express = require("express");
const authController = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");

const router = express.Router();
// router.get("/register", (req, res) => {
//   res.status(200).send("hsi router");
// });

// router.route("/register").get((req, res) => {
//   res.status(200).send("other way");
// });

router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register); //when register root hit , first check it's validate schema when all zod validation match then it's go registration logic
router.route("/login").post(authController.login);
module.exports = router;
