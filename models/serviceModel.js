const QuestionModel = require("../schema").QModel;
const UserModel = require("../schema").UserModel;
const AnswerModel = require("../schema").AnswerModel;

//Model to add Question
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

//Model to get Questions asked by Users
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

//Model to update Profile
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
//Model to get users answers
module.exports.MyAnswers = function (data) {
  return new Promise(function (resolve, reject) {
    let response = AnswerModel.find({ answeredBy: data })
      .then((doc) => {
        console.log(doc);
        resolve(doc);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Model to add answers
module.exports.addAnswers = function (data) {
  return new Promise(function (resolve, reject) {
    let response = AnswerModel.create(data, function (err, msg) {
      if (err) {
        reject(err);
      } else {
        resolve(msg);
      }
    });
  });
};

module.exports.addAnswerIdQuestionSchema = function (data) {
  return new Promise(function (resolve, reject) {
    let doc = QuestionModel.findOneAndUpdate(
      { id: data.questionId },
      { $push: { answers: data._id } },
      null,
      function (err, docs) {
        if (err) {
          reject(err);
        } else {
          QuestionModel.findOne({ id: data.questionId })
            .populate("answers")
            .exec(function (err, doc) {
              if (err) {
                resolve(false);
              } else {
                resolve(true);
              }
            });
          resolve(true);
        }
      }
    );
  });
};

//MOdel for feed
module.exports.feed = function () {
  return new Promise(function (resolve, reject) {
    QuestionModel.find({}, function (err, ques) {
      if (err) {
        reject(false);
      } else resolve(ques);
    });
  });
};
