const express = require("express");
const app = express();

const router = require("./router/auth-router");
const connectDb = require("./utils/db");
require("dotenv").config();

//middleware that parsing JSON data from incoming request. (must use at the beginning before any routes)
app.use(express.json());

//middleware that Mount the router a specific url
app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

const Port = 5000;

connectDb();

app.listen(Port, () => {
  console.log(`server running at Port ${Port}`);
});
