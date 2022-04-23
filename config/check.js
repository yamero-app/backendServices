const { OAuth2Client } = require("google-auth-library");
const cred = require("./creds").creds;

const client = new OAuth2Client(cred.Oauth.clientId);

//fucntion to verify id token
module.exports.verify = async function (id) {
  const ticket = await client.verifyIdToken({
    idToken: id,
    // "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQzMzJhYjU0NWNjMTg5ZGYxMzNlZmRkYjNhNmM0MDJlYmY0ODlhYzIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NDIzNDgxMTkwNy11b2lzbzFyNmF1MzBiaDk2NmRkazIzcHI2N2s5dGxpbi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ0MjM0ODExOTA3LXVvaXNvMXI2YXUzMGJoOTY2ZGRrMjNwcjY3azl0bGluLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1MDc1NDEwNDYxNjk5NDA2MzMzIiwiZW1haWwiOiJjaGFuZHJha2hhbm5hZGVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ4M0xBQXNBZDFtN2luWGxaQk82VG5nIiwibmFtZSI6ImNoYW5kcmFrYW50IGtoYW5uYWRlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqTHFVVGM2WDZOX1l4eU1oeDZXUDQwVFQwd2M5SkNHS2hmcGtydHZnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6ImNoYW5kcmFrYW50IiwiZmFtaWx5X25hbWUiOiJraGFubmFkZSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjUwNTU5NDgwLCJleHAiOjE2NTA1NjMwODB9.jz9FiAg943pKpDcNi0HVemkD6AoqUuE512ViQ9zSMWx38VsZdHhgybSlCJ6GgHszccHmiyFNEolcQ1ck1DMGsxUxb4P8O9H1c5o5e7Vu_QXuLbn1e2jLhp3wAVi6ZKVAqUBhM6hyjAnECIqBvNLbjqAWGHZ8TpXGLGtmQm6C7Cdkmuj5dP5hHpsQFNDM1ctgxBGk0qcVVPj8fHIa9U7lhDrq9wfWGLH-QKmGBfpVuHSGdRN_GY7UAjdc7rpW7E5_C58-IbC3sgDnCM9Asji5MA7V3g6L4hoyL12PfNEWL4QlR2P0Zn4RrukBC64yx_T2PCGT1_8JPPQaF4mM6Ekh8g",
    audience: cred.Oauth.clientId, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  console.log(payload);
  return payload;
};
verify().catch(console.error);
