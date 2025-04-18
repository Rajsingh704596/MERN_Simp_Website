const express = require("express");
const authController = require("../controllers/auth-controller");
const { signupSchema, LoginSchema } = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();
// router.get("/register", (req, res) => {
//   res.status(200).send("hsi router");
// });

// router.route("/register").get((req, res) => {
//   res.status(200).send("other way");
// });

router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register); //when register root hit , first check it's validate schema when all zod validation match then it's go registration logic
router.route("/login").post(validate(LoginSchema), authController.login); // now login form also first zod validation check , then login based on db if email and password correct

router.route("/user").get(authMiddleware, authController.user); // (get request)this route create for jwt verification of that user , get that user data and send to client  ,  here authMiddleware first run , where jwt verify  , then authController.user send that user data to client
module.exports = router;
