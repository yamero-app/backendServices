const express = require("express");
const port = process.env.port || 3000;
const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "z");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "authorization,userauth,Origin, X-Requested-With, Content-Type, Accept"
  );
});

app.listen(port, function () {
  console.log("app is listing on " + port);
});
