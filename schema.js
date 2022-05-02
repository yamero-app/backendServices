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
  likes: Number,
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
  question: String,
  askedBy: String,
  likes: Schema.Types.Number,
  imageAllowed: Boolean,
  image: String,
  code: String,
  codeAllowed: Boolean,
  topic: { type: mongoose.Schema.ObjectId, ref: "Topic" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  date: { type: Date, default: Date.now },
});

const TopicSchema = new Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  subscribers: [{ type: mongoose.Schema.ObjectId, ref: "UserModel" }],
  posts: [{ type: mongoose.Schema.ObjectId, ref: "Question" }],
});

const AnswerSchema = new Schema({
  answeredBy: String,
  QuestionId: String,
  public: Boolean,
  pic: String,
  content: String,
  Liked: Number,
});

module.exports.UserModel = mongoose.model("Users", userSchema);
module.exports.QModel = mongoose.model("Question", questionSchema);
module.exports.TopicModel = mongoose.model("Topic", TopicSchema);
module.exports.AnswerModel = mongoose.model("Answer", AnswerSchema);
