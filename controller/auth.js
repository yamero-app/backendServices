const { OAuth2Client } = require("google-auth-library");
const cred = require("../config/creds").creds;
const client = new OAuth2Client(cred.Oauth.clientId);
const authModel = require("../models/userModel");

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

//function to has been verified or not

// verify()
//   .then(() => {
//     res.cookie("session-token", token);
//     res.send("success");
//   })
//   .catch(console.error);

module.exports.login = function (req, res) {
  console.log(req.headers);
  let idToken = req.body.idToken;

  if (!idToken) {
    res.status(400);
    return res.json({
      status: 400,
      message: "idToken not given",
    });
  }
  const user = {};
  verify(idToken)
    .then(async (doc) => {
      let data = {
        id: doc.sub,
        email: doc.email,
        name: doc.name,
        picture: doc.picture,
        phoneNumber: "",
        gender: 3,
        city: "",
        country: "",
        anonName: "",
      };
      //checking whether user is in db or not
      let initResponse = await authModel.checkDb(doc.sub);

      //if not
      if (initResponse.length == 0) {
        let response = await authModel.createUser(data);
        if (response == true) {
          res.cookie("session-token", idToken);
          res.status(200);
          return res.json({
            status: 200,
            message: "User logged in",
          });
        } else {
          res.status(500);
          return res.json({
            status: 500,
            message: "Internal error occured",
          });
        }
      } else {
        //if there in db
        console.log("Checking here");
        res.cookie("session-token", idToken);
        res.status(200);
        return res.json({
          status: 200,
          message: "User logged in",
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
