const express = require("express");
const port = process.env.port || 3000;
const mongoose = require("mongoose");
const config = require("./creds").creds;
const app = express();
const userRoutes = require("");
const auth = require("./creds").auth;

mongoose.connect(config.dbLink);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "z");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "authorization,userauth,Origin, X-Requested-With, Content-Type, Accept"
  );

  if (auth.checkAuth(req.headers.authorization != 1){
    res.status(401);
    res.json({
      status : "Forbidden",
      message: "Authorization Missing"
    })
  }
});

app.use("/api_v1/user", userRoutes);

app.listen(port, function () {
  console.log("app is listing on " + port);
});
