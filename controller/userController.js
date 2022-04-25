var userModel = require("../models/userModel");

module.exports.newUser = function (req, res) {
  //have to add authentication
  if (!req.body.emailId) {
    res.status(400);
    return res.json({
      status: false,
      message: "EmailId is required",
    });
  } else {
    let data = {
      phoneNumber: req.body.number,
      name: req.body.name,
      gender: req.body.gender === "Male" ? 1 : 0,
      city: req.body.city,
      country: req.body.country,
      topics: [],
    };
  }
};
