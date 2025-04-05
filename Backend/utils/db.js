const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // connect with mongodb database
    console.log("connection successful to Database");
  } catch (error) {
    console.log("database connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;
