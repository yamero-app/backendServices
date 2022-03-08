import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
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
  question: Schema.Types.Mixed,
  deleted: Boolean,
  givenAnswers: {
    questionId: mongoose.ObjectId,
    answer: String,
    likes: Number,
  },
});
//some changes while making DB

const questionSchema = new Schema({
  question: String,
  likes: Number,
  imageAllowed: Boolean,
  codeAllowed: Boolean,
});
