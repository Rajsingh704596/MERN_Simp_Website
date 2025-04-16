//here main logic to get document data in services collection of db

const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find(); //In db services collection document find (get in array of object form that is Json string )

    if (!response) {
      //Handle the case where no document was found
      res.status(404).json({ msg: "No service found" });
      return;
    }

    res.status(200).json({ msg: response }); // res send to clientSide(frontend)
  } catch (error) {
    console.log(`services: ${error}`);
  }
};

module.exports = services;
