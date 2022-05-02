// const QuestionModel = require("";
// )
const { init } = require("express/lib/application");
const { OAuth2Client } = require("google-auth-library");
const QuestionModel = require("../models/serviceModel");
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
        let response = await QuestionModel.addQuestion(quesData);
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
