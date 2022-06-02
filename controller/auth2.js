// const Request = require("express").Request;
// const Response = require("express").Response;

const OAuth2Client = require("google-auth-library").OAuth2Client;
const User = require("../schema").UserModel;
const clientId = require("../config/creds");

const googleClient = new OAuth2Client({
  clientId: `${clientId.creds.Oauth.clientId}`,
});

module.exports.authenticateUser = async (req, res) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audient: `${clientId.creds.Oauth.clientId}`,
  });
  console.log(ticket);
  const payload = ticket.getPayload();

  let user = await User.findOne({ email: payload?.email });
  if (!user) {
    user = await new User({
      email: payload?.email,
      avatar: payload?.picture,
      name: payload?.name,
    });

    await user.save();
  }

  res.json({ user, token });
};
