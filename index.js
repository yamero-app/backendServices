const express = require("express");
const app = express();

const mongoose = require("mongoose");

require('dotenv').config();
const auth = require("./config/auth");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// Port declaration
const port = process.env.port || 3001;

// Database connections
mongoose.connect(process.env.DB_LINK);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

// Including important imp libraries
app.use(express.json());
app.use(cookieParser());

// setting headers and checking authorization
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "z");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "authorization,userauth,Origin, X-Requested-With, Content-Type, Accept"
  );

  if (!req.headers.authorization) {
    res.status(400);
    console.log("check");
    res.json({
      status: "Forbidden",
      message: "Authorization Missing",
    });
  } else {
    if (auth.checkAuth(req.headers.authorization != 1)) {
      res.status(401);
      res.json({
        status: "Forbidden",
        message: "Authorization Wrong",
      });
    } else {
      next();
    }
  }
});

app.use("/auth", authRoutes);
app.use("/features", serviceRoutes);

// Running the server on given PORT
app.listen(port, () => {
  console.log("app is listing on", port);
});
