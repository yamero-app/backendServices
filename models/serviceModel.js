const QuestionModel = require("../schema").QModel;
const UserModel = require("../schema").UserModel;

module.exports.addQuestion = function (data) {
  return new Promise(function (resolve, reject) {
    let response = QuestionModel.create(data, function (err, msg) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports.appendQuestion = function (data) {
  return new Promise(function (resolve, reject) {
    let response = UserModel.push;
  });
};
