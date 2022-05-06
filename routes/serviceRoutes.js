var router = require("express").Router();
const serviceController = require("../controller/serviceController");

//Route to add new Question
router.route("/newQuestion").post(serviceController.newQuestion);
router.route("/getProfile").get(serviceController.getProfile);
router.route("/updateProfile").post(serviceController.updateProfile);
router.route("/myQuestion").get(serviceController.MyQuestions);

module.exports = router;
