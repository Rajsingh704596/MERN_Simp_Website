const express = require("express");
const app = express();

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
require("dotenv").config();

//handling cors policy issue
const cors = require("cors");

// Configure CORS for both development and production
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://mern-simp-website.vercel.app", // Your production frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

//middleware that parsing JSON data from incoming request. (must use at the beginning before any routes)
app.use(express.json());

//middleware that Mount the router a specific url
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
// define admin route
app.use("/api/admin", adminRoute);

// app.get("/", (req, res) => {
//   res.status(200).send("hello");
// });

//before connection check if error exist , so no connection and error pass to client( that's why we use error middleware which handle whole backend error)
app.use(errorMiddleware);

const Port = process.env.PORT || 5000;

connectDb();

app.listen(Port, () => {
  console.log(`server running at Port ${Port}`);
});
