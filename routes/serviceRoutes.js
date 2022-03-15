var router = require("express").Router();
var serviceController = require("../controller/serviceController");

//routes for getting questions
router.route("/Qfeeds").get(serviceController);

module.exports = router;
