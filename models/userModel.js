const UserModel = require("../schema").UserModel;

// model to check DB whether user exist or not
module.exports.checkDb = function (data) {
  return new Promise(function (resolve, reject) {
    let msg = UserModel.find({ id: data })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// model to create a user document
module.exports.login = function (data) {
  return new Promise(function (resolve, reject) {
    let msg = UserModel.create(
      {
        id: data.id,
        emailId: data.email,
        name: data.name,
        anonName: String,
        gansos: 0,
        pfp: data.picture,
      },
      function (err, msg) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};
