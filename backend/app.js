const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const { corsOptions } = require("./constants/config");

dotenv.config({ path: "backend/config/config.env" });

// config

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://combine-lake.vercel.app"); // Replace with your frontend domain
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true"); // Add this line
//   next(); // Continue to the next middleware or route handler
// });

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
