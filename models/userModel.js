const UserModel = require("../models/userModel");

module.exports.login = function (data) {
  return new Promise(function (resolve, reject) {
    let obj = data;

    let msg = new UserModel({
      id: data.id,
      emailId: data.email,
      name: data.name,
      anonName: String,
      gansos: 0,
      pfp: data.picture,
    });

    msg
      .save()
      .then((doc) => {
        if (doc != {}) {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
