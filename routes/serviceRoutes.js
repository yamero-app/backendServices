var router = require("express").Router();
const serviceController = require("../controller/serviceController");

//Route to add new Question  (POST)
router.route("/newQuestion").post(serviceController.newQuestion);

//Route to get profile   (GET)
router.route("/getProfile").get(serviceController.getProfile);

//Route to update Profile  (POST)
router.route("/updateProfile").post(serviceController.updateProfile);

//Route to get all questions asked By users  (GET)
router.route("/myQuestion").get(serviceController.MyQuestions);

//Route to get all Answers asked by user    (GET)
router.route("/myAnswers").get(serviceController.MyAnswers);

//Route to add new Answer    (POST)
router.route("/newAnswer").post(serviceController.newAnswer);

module.exports = router;
