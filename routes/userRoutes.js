var router = require("express").Router();
var userController = require("../controller/userController");

//routes for getting questions
router.route("/newUser").post(userController.newUser);

module.exports = router;
