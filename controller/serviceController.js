// const ServiceModel= require("";
// )
const { init } = require("express/lib/application");
const { OAuth2Client } = require("google-auth-library");
const ServiceModel = require("../models/serviceModel");
const cred = require("../config/creds").creds;
const authModel = require("../models/userModel");
const client = new OAuth2Client(cred.Oauth.clientId);

//function to verify token
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: cred.Oauth.clientId, // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return payload;
}

//API to add new question

module.exports.newQuestion = function (req, res) {
  let idToken = req.cookies["session-token"];

  if (!req.body.question) {
    res.status(400);
    return res.json({
      status: 400,
      message: "Body not given. ",
    });
  }

  verify(idToken)
    .then(async (doc) => {
      //checking whether user is in db or not
      let initResponse = await authModel.checkDb(doc.sub);

      if (initResponse != []) {
        let quesData = {
          question: req.body.question,
          askedBy: doc.sub,
          likes: 0,
          imageAllowed: false,
          image: "",
          code: "",
          codeAllowed: false,
        };

        //Putting Question in DB
        let response = await ServiceModel.addQuestion(quesData);
        if (response == true) {
          res.status(200);
          return res.json({
            status: 200,
            message: "Question successfully added.",
          });
        } else {
          res.status(500);
          return res.json({
            status: 500,
            message: "Internal Error Occured,Question not added.",
          });
        }
      }
    })
    .catch((err) => {
      res.status(200);
      return res.json({
        status: 200,
        message: "Wrong Id token",
      });
    });
};

//API to get profile

module.exports.getProfile = function (req, res) {
  let idToken = req.cookies["session-token"];

  verify(idToken)
    .then(async (doc) => {
      //checking whether user is in db or not
      let response = await authModel.checkDb(doc.sub);
      console.log(response);
      if (response != []) {
        res.status(200);
        return res.json({
          status: 200,
          message: "Profile Found",
          data: response[0],
        });
      } else {
        res.status(500);
        return res.json({
          status: 500,
          message: "Internal Error Occured.",
        });
      }
    })
    .catch((err) => {
      res.status(200);
      return res.json({
        status: 200,
        message: "Wrong Id token",
      });
    });
};

//API to update Profile
module.exports.updateProfile = function (req, res) {
  let idToken = req.cookies["session-token"];

  if (!req.body) {
    res.status(200);
    return res.json({
      status: 200,
      message: "Please give body.",
    });
  }

  verify(idToken)
    .then(async (doc) => {
      //checking whether user is in db or not
      let response = await authModel.checkDb(doc.sub);
      console.log(doc.sub);
      if (response != []) {
        let filter = {
          id: doc.sub,
        };

        let data = {
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          gender: req.body.gender,
          city: req.body.city,
          country: req.body.country,
          anonName: req.body.anonName,
          about: req.body.about,
          organization: req.body.organization,
        };

        let response2 = await ServiceModel.updateProfile(filter, data);
        if (response2 == true) {
          console.log(response2);
          res.status(200);
          return res.json({
            status: 200,
            message: "Profile Updated",
          });
        } else {
          res.status(500);
          return res.json({
            status: 500,
            message: "Internal Error Occured While updating Profile",
          });
        }
      } else {
        res.status(500);
        return res.json({
          status: 500,
          message: "Internal Error Occured.",
        });
      }
    })
    .catch((err) => {
      res.status(200);
      return res.json({
        status: 200,
        message: "Wrong Id token",
      });
    });
};

//API to get Questions of user.
module.exports.MyQuestions = function (req, res) {
  let idToken = req.cookies["session-token"];

  verify(idToken)
    .then(async (doc) => {
      let data = doc.sub;
      let response = await ServiceModel.MyQuestion(data);
      if (response.length == 0) {
        res.status(200);
        return res.json({
          status: 200,
          message: "No Questions.",
        });
      } else {
        res.status(200);
        return res.json({
          status: 200,
          message: "Questions fetched.",
          questions: response,
        });
      }
    })
    .catch((err) => {
      res.status(200);
      return res.json({
        status: 200,
        message: "Wrong Id token",
      });
    });
};

// API to add answers
