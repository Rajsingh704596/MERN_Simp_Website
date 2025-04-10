const express = require("express");
const app = express();

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
require("dotenv").config();

//middleware that parsing JSON data from incoming request. (must use at the beginning before any routes)
app.use(express.json());

//middleware that Mount the router a specific url
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// app.get("/", (req, res) => {
//   res.status(200).send("hello");
// });

//before connection check if error exist , so no connection and error pass to client( that's why we use error middleware which handle whole backend error)
app.use(errorMiddleware);

const Port = 5000;

connectDb();

app.listen(Port, () => {
  console.log(`server running at Port ${Port}`);
});
