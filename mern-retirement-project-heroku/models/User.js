const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  status: {
    type: String,
  },
  applicationId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  mName: {
    type: String,
    required: true,
  },
  afm: {
    type: String,
    required: true,
  },
  amka: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  citizenship: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    default: "Συνταξιοδότηση",
  },
});

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: Number,
    default: 0,
  },
  application: ApplicationSchema,
});

module.exports = mongoose.model("user", UserSchema);
