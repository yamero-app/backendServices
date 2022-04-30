// const QuestionModel = require("";
// )

module.exports.newQuestion = function (req, res) {
  let idToken = req.cookies["session-token"];

  verify(idToken).then(async (doc) => {
    let data = {
      id: doc.sub,
    };

    //checking whether user is in db or not
    let initResponse = await authModel.checkDb(doc.sub);

    if (initResponse != []) {
      quesData = {
        question: req.body.question,
        askedBy: doc.sub,
        likes: 0,
      };
    }
  });
};
