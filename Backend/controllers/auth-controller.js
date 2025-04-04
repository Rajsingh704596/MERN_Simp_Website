// Controller- here handling the application logic , Controllers are typically used to process incoming requests(from routers), interact with models (data sources), and send response back to clients. [MVC pattern]

//Home logic

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome Home");
  } catch (error) {
    console.log(error);
  }
};

//Registration logic

const register = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: req.body });
    // res.status(200).send("welcome to registration page using Controllers");
  } catch (error) {
    res.status(400).json({ msg: "internal server error" });
  }
};
module.exports = { home, register };
