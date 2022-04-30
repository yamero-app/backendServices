var router = require("express").Router();
const serviceController = require("../controller/serviceController");

router.route("newQuestion").post(userController.newQuestion);
