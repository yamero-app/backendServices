var router = require("express").Router();
var authController = require("../controller/auth");

router.route("/login").post(authController.login);

module.exports = router;
