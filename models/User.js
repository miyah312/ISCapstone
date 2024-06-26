const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  street: {
    type: String,
    required: true
  },
  aptUnit: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expDate: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },

});

const user = mongoose.model('User', userSchema);

module.exports = user;
