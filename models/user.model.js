const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  companyName:{
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  uid: {
    type: String,
    required: false
  },
  bankAccount: {
    type: String,
    required: false
  },
  telefon: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true 
  },
  password: {
    type: String,
    required: true
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;