//! here this middleware Json web token verify using jwt verify, if it's valid then that user data send to req.user (in auth-controller.js )

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

// it's middleware , that's we use next
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization"); // req.header we get token when get req. api call by frontend for getting user data it pass Authorization key and value is Bearer jwtToken (In Postman we can check it get api call and pass token in headers)

  if (!token) {
    //if token is not valid or if you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP response"

    return res
      .status(401)
      .json({ message: "Unauthorized HTTP , Token not provided" });
  }

  console.log("token from auth middleware", token);
  //Assuming token is in the format "Bearer <jwtToken>", removing the "Bearer" prefix and extra space
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("after trim extra space and remove Bearer jwtToken", jwtToken);

  try {
    // here we verify jwt token using jwt.verify
    const isVerified = jwt.verify(
      jwtToken,
      process.env.JWT_SIGNATURE_SECRET_KEY
    );

    console.log("after jwt verify", isVerified); // here we get that user data which is pass as payload in jwt.sign time (userId, email, isAdmin)

    //email basis find data of that user in mongodb database
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    }); // .select use so we don't get password field and rest field get
    console.log("user data get from db which email is same", userData);

    //custom req property create (req. is an object that contain information about HTTP request. by adding custom properties to req, we can pass info. b/w middleware fun. or make it available in route handler.)
    req.user = userData; // now this value use by auth-controller
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Invalid token" });
  }
};

module.exports = authMiddleware;
