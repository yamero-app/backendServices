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
module.exports.createUser = function (data) {
  return new Promise(function (resolve, reject) {
    console.log(data);
    let msg = UserModel.create(
      {
        id: data.id,
        emailId: data.email,
        name: data.name,
        anonName: data.anonName,
        pfp: data.picture,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        city: data.city,
        country: data.country,
      },
      function (err, msg2) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(msg2);
          resolve(true);
        }
      }
    );
  });
};
