const express = require("express");
const port = process.env.port || 3001;
const mongoose = require("mongoose");
const config = require("./creds").creds;
const app = express();
const cookieParser = require("cookie-parser");
const auth = require("./config/auth");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// Database connections
mongoose.connect(config.dbLink);

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

app.listen(port, function () {
  console.log("app is listing on " + port);
});
