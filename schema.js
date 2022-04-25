const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  emailId: String,
  name: String,
  phoneNumber: String,
  gender: Number,
  dob: Date,
  city: String,
  country: String,
  anonName: String,
  gansos: Number,
  pfp: String,
  cover: String,
  topics: Schema.Types.Mixed,
  about: String,
  organization: String,
  question: [{ type: Schema.Types.ObjectId, ref: "Question" }], // for filling data in place of IDs
  deleted: Boolean,
  givenAnswers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
});
//some changes while making DB

const questionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  question: String,
  likes: Number,
  imageAllowed: Boolean,
  codeAllowed: Boolean,
  answers: {
    answerId: { type: Schema.Types.ObjectId, ref: "Answer" },
  },
  date: { type: Date, default: Date.now },
});

const answerSchema = new Schema({
  _id: Schema.Types.ObjectId,
});

module.exports.UserModel = mongoose.model("Users", userSchema);
module.exports.QModel = mongoose.model("Question", questionSchema);
