//  here admin-middleware check after Jwt verify we get User detail by req.user  , so here we check isAdmin is false or true if it's true then further display all user and contact data in admin dashboard

const adminMiddleware = async (req, res, next) => {
  try {
    // console.log("After jwt verify get user data by req.user which get auth-middleware",req.user);

    const isAdminID = req.user.isAdmin;

    // isAdmin is false so send error to frontend
    if (!isAdminID) {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin." });
    }
    //else isAdmin true (user is an admin), proceed to the next middleware   {note in middleware next() must use otherwise code execution stuck here}
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
