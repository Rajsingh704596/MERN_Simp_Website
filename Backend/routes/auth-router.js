const express = require("express");
const router = express.Router();

// router.get("/register", (req, res) => {
//   res.status(200).send("hi router");
// });

router.route("/register").get((req, res) => {
  res.status(200).send("other way");
});

module.exports = router;
