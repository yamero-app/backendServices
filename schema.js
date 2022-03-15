import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  emailId: String,
  name: String,
  phoneNumber: String,
  gender: String,
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
  question: [{ type: Schema.Types.ObjectId, ref: "Question" }],
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

const UserModel = mongoose.model("Users", userSchema);
const QModel = mongoose.model("Question", questionSchema);

export { UserModel, QModel };
