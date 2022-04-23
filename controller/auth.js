const { OAuth2Client } = require("google-auth-library");
const cred = require("../config/creds").creds;
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

//function to has been verified or not

// verify()
//   .then(() => {
//     res.cookie("session-token", token);
//     res.send("success");
//   })
//   .catch(console.error);

module.exports.login = function (req, res) {
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
    .then((doc) => {
      return res.json({
        ans: doc,
      });
    })
    .catch((err) => {
      console.log("error");
      res.status(200);
      return res.json({
        status: 200,
        message: "Wrong Id token",
      });
    });
};
