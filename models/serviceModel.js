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

module.exports.MyQuestion = function (data) {
  return new Promise(function (resolve, reject) {
    let response = QuestionModel.find({ askedBy: data })
      .then((doc) => {
        console.log(doc);
        resolve(doc);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.updateProfile = function (filter, data) {
  return new Promise(function (resolve, reject) {
    let doc = UserModel.findOneAndUpdate(
      filter,
      data,
      null,
      function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};
